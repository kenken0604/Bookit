This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## 專案呈現

https://bookit-a3vpo69ow-kenken0604.vercel.app/

用下方帳號以管理者的方式登入，或是自行建立一般使用者的帳號  
```bash
Email: bob@bob.com  
Password: 111111
```


## 專案功能

- 一般使用者
1. 註冊頁  
   可以上傳照片做為個人化圖像，並在成功登入後顯示在上方Navbar  
2. 搜尋頁  
   輸入地址搜尋飯店，或是增加篩選條件搜尋  
3. 飯店介紹頁  
   - 動態顯示儲存在資料庫的飯店資料  
   - 在日曆選擇日期區間預訂房間，已被預定的日期會反灰，如果選中反灰的日期則會顯示警告無法預訂
   - 預訂按鈕上會根據選中的天數計算總額（沒有串接金流因此可以直接測試）
   - 預定完房間，會在此頁下方顯示評論表單，讓已預定飯店的使用者留下評分及回饋
   - 評論會儲存到資料庫，並重新計算評分顯示到畫面
4. 個人訂單頁  
   - 顯示使用者所有訂單
   - 可進入到每一筆訂單查看內容
   - 提供下載客製化的發票
5. 個人資料頁  
   - 顯示使用者的名稱、信箱及個人圖像
   - 如需修改資料，可以輸入表單或是重新上傳照片，提交表單修改
6. 重設密碼頁  
   以輸入使用者信箱來請求重設密碼的token，並跳轉到設定頁來設定新密碼

- 網站管理員
1. 訂單頁  
   - 顯示所有訂單
   - 可以查看訂單細節
   - 刪除訂單
2. 飯店清單頁  
   - 顯示所有飯店
   - 建立新的飯店資料
   - 進入修改表單頁，更新飯店基本資料或上傳更多圖片
   - 刪除飯店
3. 搜尋評論頁
   - 以輸入飯店ID的方式搜尋該飯店的評論
   - 刪除評論
4. 使用者管理頁
   - 顯示所有使用者
   - 可以進入修改頁，更改使用者的身分
   - 刪除使用者

## 網頁效率評分
- GTmetrix
<img src="https://github.com/kenken0604/Bookit/blob/main/public/3.png" width="100%">

- PageSpeed Insights
<img src="https://github.com/kenken0604/Bookit/blob/main/public/4.png" width="100%">

## Production Deployment

https://bookit-a3vpo69ow-kenken0604.vercel.app/

You may login as an admin with account below,
or create your own one as a normal user.

```bash
Email: bob@bob.com  
Password: 111111
```


## Main Features

- As a normal user
1. Register and login
2. Search rooms by the address of the hotel, with condition filter function
3. Pick random range of dates in calendar to book the room
4. Could see the booking result and then download invoice on private page
5. After booking a room, could leave rating and comment
6. Revise personal information and password
7. Reset the password if password forgot

- As an admin
1. Check out all the booking results and details, delete if in need
2. Check out all the room information, update or delete if in need
3. Check out all the user account and change users status or delete if in need
4. Search room reviews by room ID, delete if in need


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
