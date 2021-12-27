This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Production Deployment

https://bookit-a3vpo69ow-kenken0604.vercel.app/

You may login as an admin with account below,
or create your own one as a normal user.

```bash
email: bob@bob.com  
password: 111111
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
