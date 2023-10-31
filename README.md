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
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Storybook">
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Production">
</div>

## Features

1. **Create short URL**: Create short URL with 7-digit random string.
2. **Share**: Share your short URL with others.
3. **Redirect**: Redirect to original URL when you access short URL.
4. **Analytics**: View analytics of short URL.

## Screenshots

### Dashboard

![dashboard](https://github.com/m4nd4r1n/t1ny/assets/96206089/90b4655c-ef1b-4000-88ed-1441df22bbfc)

### Links

![links](https://github.com/m4nd4r1n/t1ny/assets/96206089/2f026e59-0841-427a-bf19-659d7c48009b)

### Links detail

![links detail](https://github.com/m4nd4r1n/t1ny/assets/96206089/71f967ef-07e0-4bdd-9c84-942c7c0286de)

## Architecture

<img width="896" alt="architecture" src="https://github.com/m4nd4r1n/t1ny/assets/96206089/3117f8e7-5953-4747-a03c-bf2f33035e09">

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
