import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const confirmationURL = `{{ .SiteURL }}/api/auth/confirm?token_hash={{ .TokenHash }}&type=signup`;

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto my-0 max-w-[600px] px-[12px] pb-[48px] pt-[20px]'>
            <Heading className='text-[24px] font-bold text-[#09090B] '>
              Confirm your email
            </Heading>
            <Text className='mx-0 my-[16px] text-[#09090B]'>
              Click below to confirm your email:
            </Text>
            <Section className='text-center'>
              <Button
                className='block w-fit rounded-[8px] bg-[#18181b] px-[18px] py-[10.5px] text-center text-[14px] font-medium text-[#FAFAFA]'
                href={confirmationURL}
              >
                Confirm your mail
              </Button>
            </Section>
            <Hr className='mx-0 my-[24px] border border-[#dfe1e4]' />
            <Text
              className='mb-[24px] mt-[12px] text-[12px] text-[#898989]'
              style={{ lineHeight: '22px' }}
            >
              <Link
                href='{{ .SiteURL}}'
                target='_blank'
                className='text-[14px] text-[#71717A] underline'
              >
                t1ny
              </Link>
              <br />
              The Free URL Shortener
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
