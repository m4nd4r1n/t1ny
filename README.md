<div align="center">
  <a href="https://t1ny.kr">
    <picture>
      <img alt='' src="https://github.com/m4nd4r1n/t1ny/assets/96206089/aee1a5dc-91da-44fb-90ff-b01ae77fbb47" height="128">
    </picture>
    <h1 align="center">t1ny</h1>
  </a>
</div>

<div align="center">

Free URL shortener built with [Next.js](https://github.com/vercel/next.js) and [tailwindcss](https://github.com/tailwindlabs/tailwindcss).

  <img alt='' src="https://github.com/m4nd4r1n/t1ny/actions/workflows/ci.yml/badge.svg">
  <img alt='' src="https://img.shields.io/github/v/release/m4nd4r1n/t1ny">
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Storybook?label=Storybook">
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Production?label=Production">
</div>

## Features

1. **Create short URL**: Create short URL with 7-digit random string.
2. **Share**: Share your short URL with others.
3. **Redirect**: Redirect to original URL when you access short URL.
4. **Analytics**: View analytics of short URL.

## Screenshots

### Dashboard

![dashboard](https://github.com/m4nd4r1n/t1ny/assets/96206089/dcf4e5e4-2ec5-4974-953f-44c5c5e8dba1)

### Links

![links](https://github.com/m4nd4r1n/t1ny/assets/96206089/598cd2fa-9ed6-4e21-93df-ee0457a0ce6b)

### Links detail

![links detail](https://github.com/m4nd4r1n/t1ny/assets/96206089/fbd4ddd4-2516-4d24-88e7-e79eed34bab8)

## Architecture

<img width="896" alt="architecture" src="https://github.com/m4nd4r1n/t1ny/assets/96206089/665a41a8-7a4d-4aac-a3ec-7ae4b13c537f">

## How to run

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 18)
- [pnpm](https://pnpm.io/) (>= 8)

#### 1. Setup environment variables

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
DATABASE_URL=
BROWSER_WS_ENDPOINT= # For puppeteer
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Run development server

```bash
pnpm dev
```
