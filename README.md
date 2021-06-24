# Paytrail Payment API documentation

## Developing locally

```bash
npm install
npm run serve
```

## Run Swagger UI locally

```bash
docker run -p 80:8080 -e SWAGGER_JSON=/docs/checkout-psp-api.yaml -v /path/to/api-documentation/docs:/docs swaggerapi/swagger-ui
open http://localhost:80/
```
