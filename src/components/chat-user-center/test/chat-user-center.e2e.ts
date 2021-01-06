import { newE2EPage } from '@stencil/core/testing';

describe('chat-user-center', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-user-center></chat-user-center>');

    const element = await page.find('chat-user-center');
    expect(element).toHaveClass('hydrated');
  });
});
