## SUBMIT FORM

- path: `/api/responses/submit-form`
- method: `POST`
- role: `all`

**Request:**

- - body 需帶入以下參數:
  - (必填) responses: 陣列，包含以下 data
    - (必填) formId: String
    - (必填) questionId: String
    - response: Any

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Responses submitted successfully."
}
```

### API Error

`status 400`

- body 格式錯誤

```json
{
  "success": false,
  "message": "Invalid response data."
}
```
