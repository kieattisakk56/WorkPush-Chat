import { newE2EPage } from '@stencil/core/testing';

describe('chat-user-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-user-message></chat-user-message>');

    const element = await page.find('chat-user-message');
    expect(element).toHaveClass('hydrated');
  });
});
