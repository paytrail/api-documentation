# Payment Method Providers

The payment methods that can be tested without real money transactions have been enabled for the test accounts. Test credentials for the services can be found below.

## Test credentials

`checkout-provider` values are provided too, but they are subject to change without notice.

| Provider                            | `checkout-provider`                | Credentials                                                                                             |
| ----------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Nordea                              | `nordea`                           | No credentials needed.                                                                                  |
| OP                                  | `osuuspankki`                      | No credentials needed, will not present a UI on OP side                                                 |
| POP Pankki<br>Säästöpankki<br>OmaSP | `pop`<br>`saastopankki`<br>`omasp` | Username: `11111111`<br>Password: `123456`<br>Security code: `123456`                                   |
| Aktia                               | `aktia`                            | Username: `12345678`<br>Password: `123456`<br>Security code: `1234`                                     |
| S-Pankki                            | `spankki`                          | Username: `12345678`<br>Password: `9999`<br>Security code: `1234`                                       |
| Danske                              | `danske`                           | Danske test account login requires using real Danske credentials                                        |
| Visa                                | `creditcard`                       | See table below                                                                                         |
| Mastercard                          | `creditcard`                       | See table below                                                                                         |
| American Express                    | `amex`                             | Card number: `373953192351004`<br>Expiry date: `12/2026`<br>CVC: `1004`                                 |
| Apple Pay                           | `apple-pay`                        | Requires using real Apple Pay credentials and hosted payment gateway                                    |
| Google Pay                          | `google-pay`                       | Google Account with test cards required. Contact tekniikka@paytrail.com for more information.           |
| Walley<br>Walley B2B                | `walleyb2c`<br>`walleyb2b`         | Social security number: `010380-000P`                                                                   |
| MobilePay                           | `mobilepay`                        | Requires a separate test app and test credentials. Contact tekniikka@paytrail.com for more information. |
| Siirto                              | `siirto`                           | Success: `+358401122332`<br>User rejects: `+358401122333`                                               |
| OP Lasku                            | `oplaskuV1`                        | Testing is not possible                                                                                 |
| OP Tililuotto                       | `op-tililuotto`                    | Testing is not possible                                                                                 |
| Ålandsbanken                        | `alandsbanken`                     | Testing is not possible                                                                                 |
| Nordea B2B                          | `nordea-business`                  | Testing is not possible                                                                                 |
| Danske B2B                          | `danske-business`                  | Testing is not possible                                                                                 |
| PayPal                              | `paypal`                           | Testing is not possible                                                                                 |

## Test cards for payments

| Tokenization | Payment | Card number                        | Expiry  | CVC | Description                                                                                                                                                                                                                                                  |
| ------------ | ------- | ---------------------------------- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0313 | 11/2026 | 313 | Successful 3D Secure. 3DS form password "secret".                                                                                                                                                                                                            |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0321 | 11/2026 | 321 | Successful 3D Secure. 3DS form will be automatically completed.                                                                                                                                                                                              |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0339 | 11/2026 | 339 | 3D Secure attempt. 3DS will be automatically attempted.                                                                                                                                                                                                      |
| (OK)         | (OK)    | 4153&nbsp;0139&nbsp;9970&nbsp;0347 | 11/2026 | 347 | 3D Secure fails. The "cardholder_authentication" response parameter will be "no". It is at discretion of the merchant to accept or reject unauthentication transactions. If the merchant decides to decline the payment, the transaction should be reverted. |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0354 | 11/2026 | 354 | Successful 3D Secure. 3DS form password "secret". Insufficient funds in the test bank account.                                                                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1162 | 11/2026 | 162 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form password "secret".                                                                                                                             |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1170 | 11/2026 | 170 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form will be automatically completed.                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0024 | 11/2026 | 024 | Non-EU - "one leg out" card, not enrolled to 3DS. The "cardholder_authentication" response parameter will be "attempted".                                                                                                                                    |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0156 | 11/2026 | 156 | Non-EU - "one leg out" card, not enrolled to 3DS. Insufficient funds in the test bank account.                                                                                                                                                               |

## Provider limitations

### General limitations

Some payment method providers have minimum and/or maximum amounts for the purchases. These are not currently enforced by the API for other than OP Lasku.

### Refunds

API refunds have been implemented for all providers supporting them. Currently payments created by the following methods can be refunded only with email refunds due to their lack of a refund API:

- S-pankki
- Ålandsbanken

There can be limitations in the refund APIs too, eg. Nordea API allows to refund only once per payment, and only for payments created less than 13 weeks earlier.

#### Refunds with test account

In addition to the limitations above, the following restrictions apply for refunding test account payments:

- Nordea refunds do not work
- Aktia refunds do not work
- PayPal refunds do not work
