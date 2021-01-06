import { newE2EPage } from '@stencil/core/testing';

describe('chat-content-user', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-content-user></chat-content-user>');

    const element = await page.find('chat-content-user');
    expect(element).toHaveClass('hydrated');
  });
});
