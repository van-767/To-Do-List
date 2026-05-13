cat > /mnt/user-data/outputs/Notion_PersonalOS_Guide.md << 'EOF'
# 🧠 Personal OS trên Notion — Hướng dẫn từng bước

> Dành cho: Notion Free · Workspace trắng · 3 loại mục tiêu: Economic, Things, Personal Dev

---

## Tổng quan kiến trúc

```
🏠 Personal OS
├── 📊 Dashboard
├── 🎯 Goals Hub
│   ├── 💰 Economic Goals  ← Database 1
│   ├── 🎁 Things Wishlist ← Database 2 (Kanban)
│   └── 🧠 Personal Dev    ← Database 3
├── ✅ Tasks               ← Database 4 (Eisenhower)
├── 📅 Weekly Plan         ← Template page
├── 📖 Journal             ← Database 5
├── 🔥 Habits              ← Database 6
└── 🔄 Retrospective       ← Template page
```

---

## BƯỚC 1 — Tạo trang gốc

1. Mở Notion → click **"+ New page"** trong sidebar
2. Đặt tên: `🏠 Personal OS`
3. Chọn icon 🏠, chọn cover tuỳ ý (click "Add cover")
4. Viết 1 dòng mô tả: *"Hệ thống quản lý mục tiêu cá nhân — Economic · Things · Personal Dev"*

> Mọi database và trang con đều nằm trong trang này.

---

## BƯỚC 2 — Database 1: Economic Goals

### Tạo database
1. Trong trang Personal OS, gõ `/` → chọn **"Full page database"** → chọn **Table**
2. Đặt tên: `💰 Economic Goals`

### Properties (cột)
Xoá cột mặc định "Tags", thêm các cột sau:

| Tên cột | Kiểu | Ghi chú |
|---------|------|---------|
| Goal | Title | (mặc định) |
| Type | Select | Thêm options: `Vision 5 năm` · `Objective` · `Key Result` · `Milestone` |
| Status | Select | `🌱 Chưa bắt đầu` · `🔄 Đang làm` · `✅ Hoàn thành` · `⏸ Tạm dừng` |
| Target | Number | Format: Number (tiền mặc định bằng tay) |
| Current | Number | Số hiện tại |
| Deadline | Date | |
| Priority | Select | `🔴 Cao` · `🟡 Trung bình` · `🟢 Thấp` |
| Notes | Text | Ghi chú thêm |

### Views cần tạo
Click **"+ Add a view"** → tạo 3 views:

**View 1 — Table (mặc định)**
- Tên: `📋 All Goals`
- Filter: không
- Sort: Priority

**View 2 — Board (Kanban)**
- Tên: `📊 By Status`
- Group by: **Status**
- Ẩn cột "Notes" cho gọn

**View 3 — Table (filtered)**
- Tên: `🎯 Objectives only`
- Filter: Type = `Objective`

### Điền dữ liệu mẫu
```
Goal: "Đạt tự do tài chính trước 35 tuổi"
Type: Vision 5 năm / Status: 🔄 Đang làm

Goal: "Tiết kiệm X triệu trong năm 2025"
Type: Objective / Deadline: 31/12/2025

Goal: "Đầu tư đều đặn mỗi tháng"
Type: Key Result / Priority: 🔴 Cao
```

---

## BƯỚC 3 — Database 2: Things Wishlist (Kanban)

> Đây là database hay nhất trong system — xem theo Kanban rất trực quan.

### Tạo database
`/` → **Full page database** → **Board**
Đặt tên: `🎁 Things Wishlist`

### Properties

| Tên cột | Kiểu | Ghi chú |
|---------|------|---------|
| Item | Title | |
| Status | Select | `✨ Đang mơ` · `📋 Đang lên kế hoạch` · `💰 Đang tiết kiệm` · `🎉 Đã có rồi!` |
| Category | Select | `💻 Tech` · `🚗 Xe cộ` · `🏠 Nhà / Nội thất` · `✈️ Du lịch` · `👗 Lifestyle` · `📦 Khác` |
| Est. Cost | Number | Chi phí ước tính |
| Why | Text | Lý do muốn có |
| Target Date | Date | Ngày muốn có |
| Link | URL | Link sản phẩm tham khảo |

### Views

**View 1 — Board (mặc định, group by Status)**
- Tên: `🎯 Kanban`
- Group by: **Status**
- Properties hiển thị trên card: Category, Est. Cost

**View 2 — Gallery**
- Tên: `🖼 Gallery`

**View 3 — Table**
- Tên: `📋 Full List`
- Sort: Est. Cost (descending)

### Cách dùng Kanban
- Khi mới thêm item → để ở cột **"Đang mơ"**
- Khi bắt đầu nghiêm túc → kéo sang **"Đang lên kế hoạch"**
- Khi đang để dành tiền → **"Đang tiết kiệm"**
- Khi đã mua → **"Đã có rồi! 🎉"**

---

## BƯỚC 4 — Database 3: Personal Dev

### Tạo database
`/` → **Full page database** → **Table**
Đặt tên: `🧠 Personal Dev`

### Properties

| Tên cột | Kiểu | Ghi chú |
|---------|------|---------|
| Goal / Skill | Title | |
| Type | Select | `🎯 Objective` · `📚 Sách` · `💡 Kỹ năng` · `🏃 Thói quen` · `🧭 Tầm nhìn` |
| Status | Select | `📋 Todo` · `🔄 In Progress` · `✅ Done` |
| Area | Select | `🧠 Tư duy` · `💼 Nghề nghiệp` · `💪 Sức khoẻ` · `❤️ Quan hệ` · `🎨 Sáng tạo` |
| Deadline | Date | |
| Resource | URL | Link khoá học, sách... |
| Notes | Text | |

### Views

**View 1 — Table**
- Tên: `📋 All`

**View 2 — Board, group by Area**
- Tên: `🗂 By Area`

**View 3 — Board, group by Status**
- Tên: `📊 Progress`

**View 4 — Filter: Type = Sách**
- Tên: `📚 Reading List`

---

## BƯỚC 5 — Database 4: Tasks (Eisenhower Matrix)

### Tạo database
`/` → **Full page database** → **Board**
Đặt tên: `✅ Tasks`

### Properties

| Tên cột | Kiểu | Ghi chú |
|---------|------|---------|
| Task | Title | |
| Quadrant | Select | `🔴 Q1 Khẩn + Quan trọng` · `🔵 Q2 Quan trọng` · `🟡 Q3 Khẩn cấp` · `⬜ Q4 Thấp` |
| Category | Select | `💰 Economic` · `🎁 Things` · `🧠 Personal` · `📌 Khác` |
| Status | Checkbox | Tick = hoàn thành |
| Due | Date | |
| Goal Link | Text | Ghi tên goal liên quan (Free plan không có Relation) |

### Views

**View 1 — Board, group by Quadrant**
- Tên: `📊 Eisenhower Matrix`
- Đây là view chính — bạn thấy rõ Q1/Q2/Q3/Q4

**View 2 — Table, filter: Status = unchecked**
- Tên: `📋 Active Tasks`

**View 3 — Table, filter: Due = this week**
- Tên: `📅 This Week`

**View 4 — Table, filter: Status = checked**
- Tên: `✅ Completed`

> 💡 **Quy tắc Eisenhower:**
> - Q1: Làm ngay hôm nay
> - Q2: Lên lịch cụ thể (đây là vùng của growth)
> - Q3: Delegate nếu được, làm nhanh
> - Q4: Xoá hoặc làm sau cùng

---

## BƯỚC 6 — Database 5: Journal

### Tạo database
`/` → **Full page database** → **Table**
Đặt tên: `📖 Journal`

### Properties

| Tên cột | Kiểu | Ghi chú |
|---------|------|---------|
| Date | Title | Đặt tên theo ngày: "2025-05-12 Thứ Hai" |
| Mood | Select | `😞 1-2` · `😐 3-4` · `🙂 5-6` · `😊 7-8` · `🤩 9-10` |
| Energy | Select | `⚡ Cao` · `〰️ Bình thường` · `🪫 Thấp` |
| Highlight | Text | 1 điều tốt nhất hôm nay |
| Gratitude | Text | 3 điều biết ơn |
| Learned | Text | Bài học hôm nay |

### Nội dung bên trong mỗi trang Journal
Mỗi ngày click vào tạo 1 page, dùng template (xem Bước 8) với cấu trúc:

```
## 🌅 Buổi sáng
**Ý định hôm nay:** ...
**3 việc quan trọng:**
- [ ] 
- [ ] 
- [ ] 

## 🌙 Buổi tối — Nhìn lại
**Highlight:** ...
**3 điều biết ơn:**
1. 
2. 
3. 
**Tôi đã học được:** ...
**Ngày mai tập trung vào:** ...
```

### Views

**View 1 — Gallery**
- Tên: `🗓 Gallery`
- Card preview: Highlight

**View 2 — Table**
- Tên: `📋 List`
- Sort: Date descending

---

## BƯỚC 7 — Database 6: Habits

### Cách đơn giản nhất (Free plan)
Tạo 1 page: `🔥 Habit Tracker`

Bên trong, tạo **1 table đơn giản** (không phải database) theo tuần:

```
| Thói quen       | T2 | T3 | T4 | T5 | T6 | T7 | CN |
|----------------|----|----|----|----|----|----|-----|
| Tập thể dục     | ✅ | ✅ |    | ✅ |    |    |     |
| Đọc sách        | ✅ |    | ✅ | ✅ | ✅ |    |     |
| Viết journal    | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅  |
| Thiền           |    | ✅ |    |    |    |    |     |
```

Mỗi tuần tạo 1 section mới với heading là tuần đó.

---

## BƯỚC 8 — Template pages

### Weekly Plan Template
Tạo page: `📅 Weekly Plan Template`

```
# 📅 Tuần [số] — [ngày bắt đầu]

## 🎯 3 MIT (Most Important Tasks)
1. 
2. 
3. 

## ⚡ Chu kỳ năng lượng
**Cao điểm (deep work):** ...
**Thấp (admin, email):** ...

## 🔀 Implementation Intentions
- Khi ___ → tôi sẽ ___
- Khi ___ → tôi sẽ ___

## 📌 Ghi chú tuần
...
```

### Retrospective Template
Tạo page: `🔄 Retrospective Template`

```
# 🔄 Retro — Tuần [số]

## ✓ Win tuần này
...

## △ Chưa như ý
...

## → Tuần tới làm khác
...

## ⚡ Năng lượng (1–10): __

## ♡ Lòng biết ơn
1. 
2. 
3. 

## 🎯 Đang đi đúng hướng chưa?
...
```

---

## BƯỚC 9 — Dashboard tổng hợp

Tạo page: `📊 Dashboard`

Dùng **Linked views** để hiển thị nhiều database trên 1 trang:

1. Gõ `/` → **"Linked view of database"**
2. Chọn database **Tasks** → View: "This Week"
3. Lặp lại cho **Economic Goals** → View: "Objectives only"
4. Lặp lại cho **Things Wishlist** → View: "Kanban"

Thêm **Callout blocks** cho quick notes:
```
💡 Tầm nhìn 5 năm: [paste tầm nhìn của bạn]
🔥 Objective lớn nhất năm nay: ...
```

---

## Thứ tự setup (quan trọng)

```
Ngày 1:  Tạo Personal OS + Things Wishlist (dễ, vui nhất)
Ngày 2:  Tạo Economic Goals + Personal Dev
Ngày 3:  Tạo Tasks + điền Eisenhower matrix
Ngày 4:  Tạo Journal + viết entry đầu tiên
Ngày 5:  Setup Dashboard + link các views
Tuần 2+: Dùng Weekly Plan và Retrospective hàng tuần
```

---

## Tips quan trọng cho Free plan

| Tính năng | Cách dùng trên Free |
|-----------|---------------------|
| Relation giữa databases | Dùng cột Text "Goal Link" ghi tay |
| Reminder | Dùng date property + calendar view |
| Template tự động | Tạo page template thủ công, duplicate |
| Export | Settings → Export → Markdown + CSV |

---

## Cơ sở khoa học (giữ nguyên)

| Database | Framework |
|----------|-----------|
| Economic + Personal Dev Goals | OKR — Doerr 2018 |
| Things Wishlist | Concrete goals + Visualization |
| Tasks (Eisenhower) | Covey — 7 Habits + Urgency/Importance matrix |
| Journal | Expressive Writing — Pennebaker 1997 |
| Weekly Plan (If-Then) | Implementation Intentions — Gollwitzer 1999 |
| Habits | Habit Loop — Clear 2018 |

EOF
echo "Done"