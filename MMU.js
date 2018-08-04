MMU = {
  _inbios: 1,
  _bios: [],
  _rom: [],
  _wram: [],
  _eram: [],
  _zram: [],

  rb = (address) => {

  },
  rw = (address) => {
    switch (address) {
      case 0x0000:
        if (MMU._inbios) {
          if (address < 0x0100) {
            return MMU._bios[adress];
          } else if (Z80._r.pc == 0x0100) {
            MMU._inbios = 0;
          }
        }
        return MMU._bios[address];
      case 0x1000:
      case 0x2000:
      case 0x3000:
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        return MMU._rom[address];

      case 0x8000:
      case 0x9000:
        return GPU._vram[address & 0x1FFF]

      case 0xA000:
      case 0xB000:
        return MMU._eram[address & 0x1FFF]

      case 0xC000:
      case 0xD000:
      case 0xE000:
        return MMU._wram[address & 0x1FFF]

      case 0XF000:
        
    }
  },

  wb = () => {},
  ww = () => {},
}

module.exports = MMU;
