# Migration guide

## Why upgrade?

The legacy payment API will be shutting down gradually, and goes [offline completely in June 2020](https://www.checkout.fi/vinkkipankki/checkoutin-uudet-rajapinnat-mit%C3%A4-pit%C3%A4%C3%A4-tiet%C3%A4%C3%A4). The new API offers a lot of improvements, including

- Better performance, reliability and scalability
- More payment methods
- Server-to-server callbacks for more reliable webshop integration
- Developer friendly APIs
- Beatiful, accessible, and mobile friendly hosted payment wall and landing pages

## Changes in the new API

The new API is completely different from the legacy API. We've listed some of the key changes here for easier migration.

### Payment initialization

- Legacy API payments were initiated with a form data POST to `https://payment.checkout.fi/`
  - Merchant authentication info in the [payment payload](https://checkoutfinland.github.io/legacy-api/#payment)
  - Signature calculation with form values in specific order joined with `+`, not all data included
  - Response either an XML document or HTTP redirect to hosted payment gateway
  - Payment API issued payment ID was an integer
  - Payload for shop-in-shop payments completely different from normal payment
  - Error replies were HTML pages with limited information on how to fix the problem
- New API payments are initialized with a JSON POST to `https://api.checkout.fi/payments`
  - Merchant [authentication info in headers](/#headers-and-request-signing)
  - Signature calculation payload includes headers in alphabetical order and the full body payload
  - HMAC signed [JSON response](/#response)
    - SVG icons provided
    - Payment methods have a `group` attribute which allows easy grouping for improved user experience
  - No support for redirect, JSON document contains URL to hosted payment gateway, i.e. payments must be initialized with a server-to-server call.
  - Payment API transaction IDs are UUIDs and are used e.g. for refunds or payment status queries
  - Swedish payments use correct language code (`SV`)
  - Payload for shop-in-shop payments pretty much the same as for normal payments
  - Correct HTTP status codes and understandable error replies in JSON format

### Payment confirmation

- Legacy API returned the client browser back to webshop with [payment confirmation data in query string](https://checkoutfinland.github.io/legacy-api/#response)
  - Payment status is a number with [many possible values](https://checkoutfinland.github.io/legacy-api/#payment-statuses)
- New API does client browser redirects too, but offers an option to define callback URLs
  - [Callback URLs](/#create-request-body) are server-to-server calls and can be delayed
  - Callback URLs ensure that payment is registered also to the shop even if client browser does not return. Callback URLs are used also with providers supporting them which means that e.g. credit card payments are always registered to shop regardless of what client browser does
  - Human readable [payment statuses](/#statuses)
  - Used payment method [is reported to shop too](/#redirect-and-callback-url-parameters)

### Refund

- Legacy API refund was done with a form POST to `https://rpcapi.checkout.fi/refund2`
  - Form data contained signature and [base64 encoded XML string](https://checkoutfinland.github.io/legacy-api/#refund-api)
  - XML response
- New API refunds are done with a JSON POST to `https://api.checkout.fi/payments/{transactionId}/refund`
  - Refund API supports [callback URLs too](/#http-request-body)
  - HMAC signed [JSON response](/#response2)

### Status API

- Legacy status API was called with form POST to `https://rpcapi.checkout.fi/poll`
  - Merchant defined [stamp and reference](https://checkoutfinland.github.io/legacy-api/#polling) used for locating the payment
  - XML response with status only
- New status API is called with GET to `https://api.checkout.fi/payments/{transactionId}`
  - Payment API issued [transaction ID used](/#get)
  - HMAC signed [JSON response](/#response1) with more information than just the status

## New endpoints in the new API

- [Payment provider listing](/#list-providers) endpoint
  - Allows displaying available payment methods without actually initializing a new payment
- [Payment reporting](/#payment-reports) endpoints
- [Settlement listing](/#settlements) endpoints
