# Shop-in-shop Guidelines

This section highlights the additional requirements specific to shop-in-shop integrations. For full details on creating payments, refer to the [Payment API documentation](https://docs.paytrail.com/#/).

The Shop-in-Shop integration is intended for marketplace-type online stores where multiple sub-merchants operate under the same platform. It enables payments to be split and routed to the correct merchant.

- More information of what Shop-in-shop is and what it can be used for can be found in [Paytrail's website](https://www.paytrail.com/en/shop-in-shop)

## API endpoint

API endpoint is the same for Shop-in-shop merchants as it is for normal merchants: `services.paytrail.com`

## Credentials

Shop-in-shop integration uses two types of merchant credentials:

- `aggregate` merchant account
- `sub-merchant` account

### Test Credentials

Test credentials can be found in [Test credentials](/#shop-in-shop-merchant-account)

!> `Normal merchant account` can't be used for testing Shop-in-shop payments

### Aggregate merchant

All payment requests must be initiated and authenticated using the `aggregate` merchant's `merchantId` and `secret key`. This applies regardless of which `sub-merchant` will receive the payment.

The `aggregate` merchant’s credentials are used to generate the [HMAC signatures](/#authentication) for every API request.

### Sub-merchants

Individual payment recipients are declared at the [item](/#item) level. Each item object must include the merchant field, identifying the sub-merchant account that will receive the funds for that [item](/#item).

Only accepted merchant identifier type at the [item](/#item) level is the `sub-merchant` ID.

### Commission

The commission [commission](/#commission) recipient is always identified as a `sub-merchant` account — specifically, the aggregate merchant’s own `sub-merchant` account. This is a technical `sub-merchant` ID assigned to the `aggregate` merchant itself, used when defining commission via the commission object.

## Payment Request

Full payment request can be found in [Create payment](/#create-payment)

In a Shop in Shop integration, the payment request is constructed in two layers.

### Aggregate merchant authentication

See section: [Aggregate-merchant](/#aggregate-merchant)

### Request body

See section: [Sub-merchants](/#sub-merchants)

#### Summary

- HTTP header `aggregate` merchant ID and `secret`
- Request body `sub-merchant` ID [items](/#item)

Authenticate as the `aggregate` merchant in the `headers` and specify in the body which `sub-merchant`(s) the payment belongs to.

## Creating a sub-merchant

Sub-merchant accounts can be created through the [Paytrail Partner portal](https://partner.paytrail.com/).

For automated or programmatic onboarding, sub-merchants can also be created via the [Reseller API](/#reseller-api)