## UPDATED FORM QUESTION

- path: `/api/forms/:questionId/edit-question`
- method: `PUT`
- role: `user`

**Request:**

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

- body 需要帶入以下參數，根據**Question Type**判斷必填欄位:
  - (必填) question: String,
  - isRequired: Boolean,
  - options: String[] // multiChoice, dropdown, checkboxes 為必填
  - rowOptions: String[] // multiChoiceGrid, checkboxGrid 為必填
  - colOptions: String[] // multiChoiceGrid, checkboxGrid 為必填
  - dateOptions: date | time | both // date 為必填
  - minValue: Number // linearScale 為必填
  - maxValue: Number // linearScale 為必填
  - minLabel: String
  - maxLabel: String
  - hasLimit: Boolean
  - description: String
  - wordLimit: Number // shortAnswer, paragraph
  - multiSelectLimit: Boolean // dropdown
  - maxSelectLimit: Number // dropdown, checkboxes
  - allowedDateRange: Boolean // date
  - allowedTimeRange: Boolean // date

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Questions updated successfully",
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

### API Error

`status 404`

- 問題不存在

```json
{
  "success": false,
  "message": "Question not found"
}
```
