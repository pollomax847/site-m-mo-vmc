import { vmcContent } from './js/vmc-content.js';

describe('VMC Content', () => {
  test('should have vmc-simple section', () => {
    expect(vmcContent['vmc-simple']).toBeDefined();
    expect(vmcContent['vmc-simple'].title).toBe('VMC Simple Flux');
  });

  test('should have vmc-double section', () => {
    expect(vmcContent['vmc-double']).toBeDefined();
    expect(vmcContent['vmc-double'].title).toBe('VMC Double Flux');
  });

  test('content should contain HTML', () => {
    Object.keys(vmcContent).forEach(key => {
      expect(vmcContent[key].content).toContain('<div class="section-container">');
    });
  });
});