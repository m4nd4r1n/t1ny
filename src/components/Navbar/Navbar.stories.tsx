import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, LoremIpsum, username } from 'react-lorem-ipsum';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '.';
import { Button } from '../Button';
import { Link } from '../Link';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className='flex h-screen w-screen scale-100 justify-center p-0'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

interface AppProps extends React.PropsWithChildren {
  isMenu?: boolean;
}

const App: React.FC<AppProps> = ({ children, isMenu }) => (
  <div className='max-h-screen w-full overflow-y-scroll border border-default'>
    {children}
    <div className='flex'>
      {isMenu && <div className='ml-60 hidden h-full w-0 md:block'></div>}
      <div className={`prose mx-auto min-h-screen-header max-w-screen-lg p-4`}>
        <h1>Lorem ipsum dolor sit ame</h1>
        <div className='text-lg'>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <LoremIpsum key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Template = () => (
  <App>
    <Navbar>
      <NavbarLogo>Logo</NavbarLogo>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button color='primary'>Sign Up</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  </App>
);

const menuItems = ['Dashboard', 'Links', 'Settings', 'Profile', 'Log Out'];

const menu = (
  <NavbarMenu>
    <NavbarMenuItem>
      {menuItems.slice(0, 4).map((item, index) => (
        <Link key={`${item}-${index}`} isFull isBlock>
          {item}
        </Link>
      ))}
    </NavbarMenuItem>
    <NavbarMenuItem justify='end'>
      <Link isFull isBlock>
        {menuItems[4]}
      </Link>
    </NavbarMenuItem>
  </NavbarMenu>
);

const TemplateWithMenu = () => (
  <App isMenu>
    <Navbar menu={menu}>
      <NavbarMenuToggle />
      <NavbarLogo>Logo</NavbarLogo>
      <NavbarContent justify='end'>
        <NavbarItem>
          <div className='flex items-center gap-2'>
            <Avatar
              className='rounded-full'
              gender='male'
              width='50'
              height='50'
              alt='Avatar'
            />
            <div>{username()}</div>
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  </App>
);

export const WithoutMenu: Story = {
  render: Template,
};

export const WithMenu: Story = {
  render: TemplateWithMenu,
};
