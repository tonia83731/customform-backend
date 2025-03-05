## CHECK VALIDATION

- path: `/api/responses/:formId/validation`
- method: `GET`
- role: `all`

**Request:**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": true // 判斷表單是否已經發布
}
```
