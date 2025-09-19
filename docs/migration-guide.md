# Migration guide

## Why upgrade?

Paytrail Payment API has been released on October 5th 2021 and it has replaced all previous interfaces.

### Migrating from Checkout PSP API

Checkout PSP API is deprecated. The old PSP API will be available for some time, but all new development is done solely on the Paytrail Payment API.

Migration from the Checkout Finland's current PSP API is easy and only small changes are required which are described below.

## Changes in the new API

### Migrating from Checkout PSP API

Paytrail Payment API is nearly identical compared to the old Checkout PSP API.

The main differences are:

- The PSP API URL was `https://api.checkout.fi` and the new Payment API URL is `https://services.paytrail.com`
- Two fields have been renamed:
  - `cof-request-id` is now `request-id`
  - `cof-plugin-version` is now `platform-name`
- One previously required field has been made optional:
  - `deliveryDate`

## Paytrail Payment API endpoints

- [Payment provider listing](/#list-providers) endpoint
  - Allows displaying available payment methods without actually initializing a new payment
- [Payment reporting](/#payment-reports) endpoints
- [Settlement listing](/#settlements) endpoints
