## ADD FORM QUESTIONS

- path: `/api/forms/:formId/add-question`
- method: `POST`
- role: `user`

**Request:**

- body 需要帶入以下參數:
  - (必填) questionType: String
  - (必填) sectionId: String | null

**Question Type:**
- shortAnswer
- paragraph
- multiChoice
- dropdown
- checkboxes
- linearScale
- date
- multiChoiceGrid
- checkboxGrid

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "_id": "67ab164cb05cb4661a6f4d6e",
    "formId": "67aaf5e9a7627c12438341a0",
    "questionType": "shortAnswer",
    "options": [],
    "rowOptions": [],
    "colOptions": [],
    "allowedDateRange": false,
    "allowedTimeRange": false,
    "hasLimit": false,
    "wordLimit": null,
    "multiSelectLimit": false,
    "maxSelectLimit": null,
    "order": 1,
    "sectionId": "67ab0e7dbc959ed33cd44814",
    "createdAt": "1739265612514",
    "updatedAt": "1739282062609",
    "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut odio justo, pellentesque ac sodales sit amet, malesuada at urna. Ut.",
    "isRequired": true
  }
}
```
