## GET RESPONSES

- path: `/api/forms/:formId/responses`
- method: `GET`
- role: `user`

**Request:**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON 表單 form **物件**, 問題 questions **陣列**, 回答 responses **陣列**

```json
{
  "success": true,
  "data": {
    "form": {
      "title": "",
      "description": ""
    },
    "questions": [],
    "responses": []
  }
}
```

### API Error

`status 404`

- 表單不存在

```json
{
  "success": false,
  "message": "Form not found"
}
```
