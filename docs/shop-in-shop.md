# Shop-in-shop

This section highlights the additional requirements specific to shop-in-shop integrations. For full details on creating payments, refer to the Payment API documentation.

## API endpoint

API endpoint is the same for Shop-in-shop merchants as it is for normal merchants: `services.paytrail.com`

## Credentials

Shop-in-shop integration uses two types of merchant credentials: the aggregate merchant account and sub-merchant accounts.

### Test Credentials

Test credentials can be found in LINKKI TÄHÄN

### Aggregate merchant

All payment requests must be initiated and authenticated using the aggregate merchant credentials — the merchant ID `merchantId` and secret key. This applies regardless of which sub-merchant will receive the payment.

The aggregate merchant’s credentials are used to generate the HMAC signature for every API request.

### Sub-merchants

Individual payment recipients are declared at the item level. Each item object must include the merchant field, identifying the sub-merchant account that will receive the funds for that item.

The only accepted merchant identifier type at the item level is the sub-merchant ID. Using the aggregate merchant ID at the item level is not supported.

| Field                           | Type    | Required           | Description                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkout-account`              | numeric | <center>x</center> | Paytrail account ID                                                                                                                                                                                                                                                                                                                                     |
| `checkout-algorithm`            | string  | <center>x</center> | Used signature algorithm. The same as used by merchant when creating the payment.                                                                                                                                                                                                                                                                       |
| `checkout-amount`               | numeric | <center>x</center> | Payment amount in currency minor unit, e.g. cents. Maximum value of 99999999.                                                                                                                                                                                                                                                                           |
| `checkout-settlement-reference` | string  | <center>-</center> | Payment reference of the settlement in which the succeeded transaction will be included in.<br><br>**Note:** This field will be provided only for specific Suomi.fi merchants and only when calling success-callback.                                                                                                                                   |
| `checkout-stamp`                | string  | <center>x</center> | Merchant provided stamp. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                     |
| `checkout-reference`            | string  | <center>x</center> | Merchant provided reference. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                 |
| `checkout-transaction-id`       | string  | <center>x</center> | Paytrail provided transaction ID.<br><br>**Note:** In case of refund request that fails in semantic validation (e.g. insufficient account balance), this field will not be provided since the refund transaction does not exist yet.<br><br>**Important:** Store the value. It is needed for other actions such as refund or payment information query. |
| `checkout-status`               | string  | <center>x</center> | Payment status, either `ok`, `pending`, `delayed`, or `fail`. See [statuses](#statuses) section for more information.                                                                                                                                                                                                                                   |
| `checkout-provider`             | string  | <center>x</center> | The payment method provider the client used. Current values are documented on [providers tab](/payment-method-providers#test-credentials). The values are subject to change without notice.                                                                                                                                                             |
| `signature`                     | string  | <center>x</center> | HMAC signature calculated from other parameters.                                                                                                                                                                                                                                                                                                        |

### Commission

The commission recipient is always identified as a sub-merchant account — specifically, the aggregate merchant’s own sub-merchant account. This is a technical sub-merchant ID assigned to the aggregate merchant itself, used when defining commission via the commission object.

## Payment Request

In a Shop in Shop integration, the payment request is constructed in two layers.

### Aggregate merchant authentication

The aggregate merchant’s credentials are added first to the HTTP request headers. The key headers are checkout-account, which contains the aggregate merchant’s merchant ID, and checkout-signature, which is calculated using the aggregate merchant’s secret. These headers allow Paytrail to identify the sender and validate the request via HMAC signature.

### Request body

Only after the headers is the target sub-merchant specified in the actual request body. This is done within the items field, where each order line can include a merchant field containing the sub-merchant(s) merchant ID. This allows Paytrail to automatically route funds to the correct sub-merchant and deduct any commission set by the aggregate.

### Summary

- HTTP header aggregate merchant ID and secret
- Request body Sub-merchant ID [items](/#item)

Authenticate as the aggregate merchant in the headers and specify in the body which sub-merchant(s) the payment belongs to.

## Creating a sub-merchant

Sub-merchant accounts can be created through the Paytrail Partner Portal. For automated or programmatic onboarding, sub-merchants can also be created via the Reseller API — this requires separate activation by Paytrail, after which an API key is provided for authentication.

Note: The Reseller API uses Bearer token authentication (LINKKI). This is the only endpoint in the Paytrail API that does not use HMAC signature authentication.

### API endpoint

API endpoint is `HTTP POST /merchants`

### Request

| Field                           | Type    | Required           | Description                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkout-account`              | numeric | <center>x</center> | Paytrail account ID                                                                                                                                                                                                                                                                                                                                     |
| `checkout-algorithm`            | string  | <center>x</center> | Used signature algorithm. The same as used by merchant when creating the payment.                                                                                                                                                                                                                                                                       |
| `checkout-amount`               | numeric | <center>x</center> | Payment amount in currency minor unit, e.g. cents. Maximum value of 99999999.                                                                                                                                                                                                                                                                           |
| `checkout-settlement-reference` | string  | <center>-</center> | Payment reference of the settlement in which the succeeded transaction will be included in.<br><br>**Note:** This field will be provided only for specific Suomi.fi merchants and only when calling success-callback.                                                                                                                                   |
| `checkout-stamp`                | string  | <center>x</center> | Merchant provided stamp. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                     |
| `checkout-reference`            | string  | <center>x</center> | Merchant provided reference. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                 |
| `checkout-transaction-id`       | string  | <center>x</center> | Paytrail provided transaction ID.<br><br>**Note:** In case of refund request that fails in semantic validation (e.g. insufficient account balance), this field will not be provided since the refund transaction does not exist yet.<br><br>**Important:** Store the value. It is needed for other actions such as refund or payment information query. |
| `checkout-status`               | string  | <center>x</center> | Payment status, either `ok`, `pending`, `delayed`, or `fail`. See [statuses](#statuses) section for more information.                                                                                                                                                                                                                                   |
| `checkout-provider`             | string  | <center>x</center> | The payment method provider the client used. Current values are documented on [providers tab](/payment-method-providers#test-credentials). The values are subject to change without notice.                                                                                                                                                             |
| `signature`                     | string  | <center>x</center> | HMAC signature calculated from other parameters.                                                                                                                                                                                                                                                                                                        |

### Response

On success `200 OK`, the API returns the new sub-merchant's credentials

```
{
  "merchantId": 375917,
  "secret": "b92f9ca58761d396fa5d2aed1537805996a6348901922a4e229a6f3dbb312373af07dc39806186c0"
}
```

Store these credentials securely. The `merchantId` is used in the `merchant` field of payment items, and the `secret` is used if the sub-merchant needs to access the API directly.

| Field                           | Type    | Required           | Description                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkout-account`              | numeric | <center>x</center> | Paytrail account ID                                                                                                                                                                                                                                                                                                                                     |
| `checkout-algorithm`            | string  | <center>x</center> | Used signature algorithm. The same as used by merchant when creating the payment.                                                                                                                                                                                                                                                                       |
| `checkout-amount`               | numeric | <center>x</center> | Payment amount in currency minor unit, e.g. cents. Maximum value of 99999999.                                                                                                                                                                                                                                                                           |
| `checkout-settlement-reference` | string  | <center>-</center> | Payment reference of the settlement in which the succeeded transaction will be included in.<br><br>**Note:** This field will be provided only for specific Suomi.fi merchants and only when calling success-callback.                                                                                                                                   |
| `checkout-stamp`                | string  | <center>x</center> | Merchant provided stamp. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                     |
| `checkout-reference`            | string  | <center>x</center> | Merchant provided reference. Maximum of 200 characters.                                                                                                                                                                                                                                                                                                 |
| `checkout-transaction-id`       | string  | <center>x</center> | Paytrail provided transaction ID.<br><br>**Note:** In case of refund request that fails in semantic validation (e.g. insufficient account balance), this field will not be provided since the refund transaction does not exist yet.<br><br>**Important:** Store the value. It is needed for other actions such as refund or payment information query. |
| `checkout-status`               | string  | <center>x</center> | Payment status, either `ok`, `pending`, `delayed`, or `fail`. See [statuses](#statuses) section for more information.                                                                                                                                                                                                                                   |
| `checkout-provider`             | string  | <center>x</center> | The payment method provider the client used. Current values are documented on [providers tab](/payment-method-providers#test-credentials). The values are subject to change without notice.                                                                                                                                                             |
| `signature`                     | string  | <center>x</center> | HMAC signature calculated from other parameters.                                                                                                                                                                                                                                                                                                        |
