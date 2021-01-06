import { newE2EPage } from '@stencil/core/testing';

describe('chat-directory', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-directory></chat-directory>');

    const element = await page.find('chat-directory');
    expect(element).toHaveClass('hydrated');
  });
});
