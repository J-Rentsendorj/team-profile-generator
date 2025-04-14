const Manager = require('../lib/Manager');

test('Can set office number via constructor argument', () => {
    const officeNumber = 100;
    const mgr = new Manager('Alice', 1, 'test@test.com', officeNumber);
    expect(mgr.officeNumber).toBe(officeNumber);
});

test('getRole() should return "Manager"', () => {
    const mgr = new Manager('Alice', 1, 'test@test.com', 100);
    expect(mgr.getRole()).toBe('Manager');
});
