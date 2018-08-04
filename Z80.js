const { MMU } = require('./MMU');

Z80 = {
  // Time clock: The Z80 holds two types of clock (m and t)
  _clock = { m : 0, t: 0 },

  _r: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    h: 0,
    l: 0,
    pc: 0,
    sp: 0,
    m: 0,
    t: 0
  },

  // Add E to A, leaving result in A (ADD A, E)
  ADDr_e = () => {
    Z80._r.a += Z80._r.e;
    Z80._r.f = 0;
    if (!Z80._r.a) Z80._r.f |= 0x80;
    if (Z80._r.a > 255) Z80._r.f |= 0x10;
    Z80._r.a &= 255;
    Z80._r.m = 1;
    Z80._r.t = 4;
  },

  // Add B to A, setting the flags CP (A, B)
  CPr_b = () => {
    const i = Z80._r.a;
    i -= Z80._r.b;
    Z80._r.f |= 0x40;
    if (i === 0) Z80._r.f |= 0x80;
    if (i < 0) Z80._r.f |= 0x10;
    Z80._r.m = 1;
    Z80._r.t = 4;
  },

  // Don't perfome any operation
  NOP = () => {
    Z80._r.m = 1;
    Z80._r.t = 4;
  },

  PUSHBC = () => {
    Z80._r.sp--;
    MMU.wb(Z80._r.sp, Z80._r.b);
    Z80._r.sp--;
    MMU.wb(Z80._r.sp, Z80._r.c);
    Z80._r.m = 3;
    Z80._r.t = 12
  },

  POPHL = () => {
    Z80._r.l = MMU.rb(Z80._r.sp);
    Z80._r.sp++;
    Z80._r.h = MMU.rb(Z80._r.sp);
    Z80._r.sp++;
    Z80._r.m = 3;
    Z80._r.t = 12
  },

  LDAmm = () => {
    const address = MMU.rw(Z80._r.pc);
    Z80._r.pc += 2;
    Z80._r.a = MMU.rb(address);
    Z80._r.m = 4;
    Z80._r.t = 16
  },

  reset = () => {
    Z80._r.a = 0;
    Z80._r.b = 0;
    Z80._r.c = 0;
    Z80._r.d = 0;
    Z80._r.e = 0;
    Z80._r.h = 0;
    Z80._r.l = 0;
    Z80._r.f = 0;
    Z80._r.sp = 0;
    Z80._r.pc = 0;
    Z80._clock.m = 0;
    Z80._clock.t = 0;
  }


}