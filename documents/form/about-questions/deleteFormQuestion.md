## DELETED FORM QUESTIONS

- path: `/api/forms/:formId/:questionId/delete-question`
- method: `DELETE`
- role: `user`

**Request:**

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

- 問題不存在

```json
{
  "success": false,
  "message": "Question not found"
}
```
