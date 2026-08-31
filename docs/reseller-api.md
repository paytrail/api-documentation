# Reseller API

Merchant accounts can be created through the [Paytrail Partner portal](https://partner.paytrail.com/).

For automated or programmatic onboarding, merchants can also be created via the [Reseller API](/#creating-a-merchant).

Using [Reseller API](/#creating-a-merchant) requires separate activation by Paytrail, after which `Authorization: Bearer <api-key>` is provided for authentication.

!> Reseller API uses **Bearer token** authentication. This is the only endpoint that does not use HMAC signature authentication.





## Creating a merchant

`POST /merchants`

Creates a new merchant. The same endpoint is used both for **normal merchants** and for **Shop-in-Shop sub-merchants** — which one you get depends on the `merchantType` field, and each 'merchantType' has a different set of minimum required fields.

### Request body

| Field | Type | Required | Description |
|---|---|:---:|---|
| `companyName` | string | X | Registered company name. |
| `marketingName` | string | X | Public-facing / marketing name. |
| `streetAddress` | string | X | Company street address. |
| `postalCode` | string | X | Company postal code. |
| `city` | string | X | Company city. |
| `packageId` | string | X | Package to assign. See: [Listing available packages](#listing-available-packages). |
| `vatId` | string | X | Business ID / VAT number. |
| `contactDetails` | object | X | Contact person's details. See [contactDetails](#contactdetails). |
| `ecommerce` | object | X | Webstore details. See [ecommerce](#ecommerce). |
| `merchantType` | string | X | `NORMAL` or `SUB`. |
| `aggregateId` | integer | | The `merchantId` of the `aggregate` this sub-merchant belongs to. **Note**: Required only when `merchantType` is `SUB`. |

#### contactDetails

| Field | Type | Required | Description |
|---|---|:---:|---|
| `email` | string | X | Contact person's email. |
| `streetAddress` | string | X | Contact person's address. |
| `postalCode` | string | X | Contact person's postal code. |
| `city` | string | X | Contact person's city. |
| `phoneNumber` | string | X | Contact person's phone number. |

#### ecommerce

| Field | Type | Required | Description |
|---|---|:---:|---|
| `url` | string | X | Webstore or marketplace URL. |
| `description` | string | X | Short description of the store. |
### Examples

**Normal merchant**

```json
{
  "companyName": "Test Shop oy",
  "marketingName": "Test Shop",
  "streetAddress": "Hämeenkatu 5 A 23",
  "postalCode": "33100",
  "city": "Tampere",
  "packageId": "1",
  "vatId": "1234567-1",
  "contactDetails": {
    "email": "test.merchant@example.com",
    "streetAddress": "Hämeenkatu 5 A 23",
    "postalCode": "33100",
    "city": "Tampere",
    "phoneNumber": "+358 123 1234"
  },
  "ecommerce": {
    "url": "shop.example.com",
    "description": "Normal test shop"
  },
  "merchantType": "NORMAL"
}
```

**Shop-in-Shop sub-merchant**

```json
{
  "companyName": "Sub merchant Oy",
  "marketingName": "Sub web shop",
  "streetAddress": "Hämeenkatu 1",
  "postalCode": "33100",
  "city": "Tampere",
  "packageId": "2",
  "contactDetails": {
    "email": "sub.merchant@example.com",
    "streetAddress": "Hämeenkatu 1",
    "postalCode": "33100",
    "city": "Tampere",
    "phoneNumber": "+358 123 1234"
  },
  "ecommerce": {
    "url": "subshop.example.com",
    "description": "Normal test shop"
  },
  "merchantType": "SUB",
  "aggregateId": 375917
}
```

### Response

| Response code | Explanation                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| 200        | 	OK. Merchant created                                                                |
| 400        | Bad Request  |
| 401        | 	Invalid credentials|

When `200` is returned, the response body containss `merchantId` and `secret` for the new merchant.  For a sub-merchant, the returned `merchantId` is the ID used in the item-level `merchant` field when constructing [Shop-in-Shop payment requests](/#item).

!> **NOTE:** Store the `secret` securely since it cannot be retrieved again later.

**Example response**

```json
{
  "merchantId": 375917,
  "secret": "b92f9ca58761d396fa5d2aed1537805996a6348901922a4e229a6f3dbb312373af07dc39806186c0"
}
```

## Listing available packages

`GET /packages`

Before creating a merchant you must choose a package for it. A package defines the rates and monthly fees charged to the merchant, as well as the provisions paid to the reseller. If you need changes to your packages, contact `kumppanit@paytrail.com`.

### Response

| Response code | Explanation                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| 200        | 	OK                                                                |
| 401        | Bad Request  |
| 404        | No packages found.|

When `200` is returned, the response body contains a list of all available packages for the reseller:

**Example response**

```json
[
  {
    "id": 0,
    "title": "string",
    "description": "string",
    "monthlyFee": 0,
    "monthlyFeeProvision": 0,
    "iconUrl": "string",
    "activeFrom": "string",
    "activeTo": "string"
  }
]
```