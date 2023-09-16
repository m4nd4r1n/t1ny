import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '.';

describe('Navbar component', () => {
  it('should render correctly', () => {
    const wrapper = render(<Navbar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with logo', () => {
    const testId = 'navbar-logo-test';
    const wrapper = render(
      <Navbar>
        <NavbarLogo data-testid={testId}>Logo</NavbarLogo>
      </Navbar>,
    );

    expect(wrapper.getByTestId(testId)).toBeInTheDocument();
  });

  it('should render correctly with content children', () => {
    const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

    const testId = 'navbar-content-test';

    const wrapper = render(
      <Navbar>
        <NavbarContent data-testid={testId}>
          {items.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>{item}</NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>,
    );

    const navbarContent = wrapper.getByTestId(testId);

    expect(navbarContent.children.length).toBe(5);
  });

  it('should render correctly with menu', () => {
    const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

    const wrapper = render(
      <Navbar data-testid='navbar-test'>
        <NavbarMenuToggle data-testid='navbar-toggle-test' />
        <NavbarContent data-testid='navbar-content-test'>
          {items.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>{item}</NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu data-testid='navbar-menu-test'>
          {items.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>{item}</NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>,
    );

    const toggle = wrapper.getByTestId('navbar-toggle-test');

    act(() => {
      toggle.click();
    });

    const menu = wrapper.getByTestId('navbar-menu-test');

    expect(menu.children.length).toBe(items.length);
    expect(menu).toHaveClass('w-full');
  });
});
