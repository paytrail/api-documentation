# Migration guide

## Why upgrade?

Paytrail Payment API will be released on October 5th 2021 and it will replace all previous interfaces.

### Migrating from Checkout PSP API

When the new Paytrail Payment API is released Checkout PSP API will become deprecated. The old PSP API will be available for some time, but all new development will be done solely on the Paytrail Payment API.

Migration from the Checkout Finland's current PSP API is easy and only small changes are required which are described below.

### Migrating from Paytrail E2 Interface

The new Paytrail Payment API will replace all legacy Paytrail integrations, including E2 Interface. Old interfaces will be shutting down gradually and go offline completely in summer 2022.

The new API offers a lot of improvements, including but not limited to:

- Better performance, reliability and scalability
- More payment methods
  - Apple Pay
  - Card Tokenization
- Server-to-server callbacks for more reliable webshop integration
- Developer friendly APIs
- Beatiful, accessible, and mobile friendly hosted payment wall and landing pages

## Changes in the new API

### Migrating from Checkout PSP API

The new Paytrail Payment API is nearly identical compared to the current Checkout PSP API. 

The main differences are:
- The PSP API URL was `https://api.checkout.fi` and the new Payment API URL is `https://service.paytrail.com`
- Two fields have been renamed:
  - `cof-request-id` is now `request-id`
  - `cof-plugin-version` is now `plugin-name`
- One previously required field has been made optional:
  - `deliveryDate`

### Migrating from Paytrail E2 Interface

The new Payment API is completely different from the legacy E2 Interface. We've listed some of the key differences here for easier migration.

#### Payment initialization

- Legacy E2 Interface payments were initiated with a form data POST to `https://payment.paytrail.com/e2`
  - Merchant authentication info in the payment payload
  - Signature calculation with form values in specific order joined with  `|` (pipe) character
  - Response either an XML document or HTTP redirect to hosted payment gateway
  - Payment API issued payment ID was an integer
  - Payload for shop-in-shop payments completely different from normal payment
  - Error replies were HTML pages with limited information on how to fix the problem

- New Payment API payments are initialized with a JSON POST to `https://service.paytrail.com/payments`
  - Merchant authentication info in headers
  - Signature calculation payload includes headers in alphabetical order and the full body payload
  - HMAC signed JSON response
  - SVG icons provided
  - Payment methods have a group attribute which allows easy grouping for improved user experience
  - No support for redirect, JSON document contains URL to hosted payment gateway, i.e. payments must be initialized with a server-to-server call.
  - Payment API transaction IDs are UUIDs and are used e.g. for refunds or payment status queries
  - Swedish payments use correct language code (SV)
  - Payload for shop-in-shop / marketplace payments pretty much the same as for normal payments
  - Correct HTTP status codes and understandable error replies in JSON format

#### Payment confirmation

- Legacy E2 Interface returned the client browser back to webshop with payment confirmation data in query string
  - Payment status is a number with many possible values

- New Payment API does client browser redirects too, but offers an option to define callback URLs
  - Callback URLs are server-to-server calls and can be delayed
  - Callback URLs ensure that payment is registered also to the shop even if client browser does not return. Callback URLs are used also with providers supporting them which means that e.g. credit card payments are always registered to shop regardless of what client browser does
  - Human readable payment statuses
  - Used payment method is reported to shop too

#### Refund

- Legacy E2 Interface refund was done with a POST request to `https://api.paytrail.com/merchant/v1/payments/{orderNumber}/refund`
  - Headers contained MD5 encoded signature
  - JSON response

- New API refunds are done with a JSON POST to `https://service.paytrail.com/payments/{transactionId}/refund`
  - Refund API supports callback URLs too
  - HMAC signed JSON response

#### Status API

- In legacy E2 Interface querying payment status was done with GET request to `https://api.paytrail.com/merchant/v1/payments?order_number={orderNumber}`
  - Merchant defined stamp and reference used for locating the payment
  - XML response with status only

- New status API is called with GET to `https://service.paytrail.com/payments/{transactionId}`
  - Payment API issued transaction ID used
  - HMAC signed JSON response with more information than just the status

## New endpoints in the new API

- [Payment provider listing](/#list-providers) endpoint
  - Allows displaying available payment methods without actually initializing a new payment
- [Payment reporting](/#payment-reports) endpoints
- [Settlement listing](/#settlements) endpoints
