## DELETED FORM

- path: `/api/forms/:formId/delete-form`
- method: `DELETE`
- role: `user`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Form and associated questions deleted successfully"
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
