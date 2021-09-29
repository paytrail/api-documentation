# Payment Method Providers

The payment methods that can be tested without real money transactions have been enabled for the test accounts. Test credentials for the services can be found below.

## Test credentials

`checkout-provider` values are provided too, but they are subject to change without notice.

| Provider                                             | `checkout-provider`                                   | Credentials                                                       |
| ---------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| OP                                                   | `osuuspankki`                                         | Username: 123456<br>Password: 7890<br>Security code: any          |
| Nordea                                               | `nordea`                                              | Username: 123456<br>Password: 1111<br>Security code: any          |
| Handelsbanken<br>POP Pankki<br>Säästöpankki<br>OmaSP | `handelsbanken`<br>`pop`<br>`saastopankki`<br>`omasp` | Username: 11111111<br>Password: 123456<br>Security code: 123456   |
| Aktia                                                | `aktia`                                               | Username: 12345678<br>Password: 123456<br>Security code: 1234     |
| S-Pankki                                             | `spankki`                                             | Username: 12345678<br>Password: 9999<br>Security code: 1234       |
| Danske                                               | `danske`                                              | Danske test account login requires using real Danske credentials  |
| Visa                                                 | `creditcard`                                          | Card number: 4153013999700024<br>Expiry date: 11/2023<br>CVC: 024 |
| Mastercard                                           | `creditcard`                                          | Card number: 5353299308701770<br>Expiry date: 11/2023<br>CVC: 770 |
| American Express                                     | `amex`                                                | Card number: 373953192351004<br>Expiry date: 12/2023<br>CVC: 1004 |
| Collector<br>Collector B2B                           | `collectorb2c`<br>`collectorb2b`                      | Social security number: 010380-000P                               |
| Pivo                                                 | `pivo`                                                | Testing is not possible                                           |
| MobilePay                                            | `mobilepay`                                           | Testing is not possible                                           |
| Siirto                                               | `siirto`                                              | Testing is not possible                                           |
| OP Lasku                                             | `oplasku`                                             | Testing is not possible                                           |
| Jousto                                               | `jousto`                                              | Testing is not possible                                           |
| Ålandsbanken                                         | `alandsbanken`                                        | Testing is not possible                                           |

## Test cards for tokenization

| Tokenization | Payment | Card number                        | Expiry  | CVC | Description                                                                                                                                                                                                                                                  |
| ------------ | ------- | ---------------------------------- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0313 | 11/2023 | 313 | Successful 3D Secure. 3DS form password "secret".                                                                                                                                                                                                            |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0321 | 11/2023 | 321 | Successful 3D Secure. 3DS form will be automatically completed.                                                                                                                                                                                              |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0339 | 11/2023 | 339 | 3D Secure attempt. 3DS will be automatically attempted.                                                                                                                                                                                                      |
| (OK)         | (OK)    | 4153&nbsp;0139&nbsp;9970&nbsp;0347 | 11/2023 | 347 | 3D Secure fails. The "cardholder_authentication" response parameter will be "no". It is at discretion of the merchant to accept or reject unauthentication transactions. If the merchant decides to decline the payment, the transaction should be reverted. |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0354 | 11/2023 | 354 | Successful 3D Secure. 3DS form password "secret". Insufficient funds in the test bank account.                                                                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1162 | 11/2023 | 162 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form password "secret".                                                                                                                             |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1170 | 11/2023 | 170 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form will be automatically completed.                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0024 | 11/2023 | 024 | Non-EU - "one leg out" card, not enrolled to 3DS. The "cardholder_authentication" response parameter will be "attempted".                                                                                                                                    |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0156 | 11/2023 | 156 | Non-EU - "one leg out" card, not enrolled to 3DS. Insufficient funds in the test bank account.                                                                                                                                                               |

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
