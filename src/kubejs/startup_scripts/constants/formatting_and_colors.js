// Formatting codes (see https://minecraft.wiki/w/Formatting_codes)
global.formattingCodes = {
    // Color must be applied FIRST
    'black':        '§0',   // 0x000000
    'dark_blue':    '§1',   // 0x0000AA
    'dark_green':   '§2',   // 0x00AA00
    'dark_aqua':    '§3',   // 0x00AAAA
    'dark_red':     '§4',   // 0xAA0000
    'dark_purple':  '§5',   // 0xAA00AA
    'gold':         '§6',   // 0xFFAA00
    'gray':         '§7',   // 0xAAAAAA
    'dark_gray':    '§8',   // 0x555555
    'blue':         '§9',   // 0x5555FF
    'green':        '§a',   // 0x55FF55
    'aqua':         '§b',   // 0x55FFFF
    'red':          '§c',   // 0xFF5555
    'light_purple': '§d',   // 0xFF55FF
    'yellow':       '§e',   // 0xFFFF55
    'white':        '§f',   // 0xFFFFFF
    // Formatting must be applied AFTER color (Exception: 'reset')
    'bold':         '§l',   // Make text thicker
    'italic':       '§o',   // Make text italic
    'strike':       '§m',   // Strikes out text
    'underline':    '§n',   // Underline text
    'magic':        '§k',   // Causes text to constantly change
    'reset':        '§r',   // Resets formatting
}


// Dye colors inside minecraft (Registration order)
global.dyeColors = [
    { name: 'white',        code: 0xF9FFFE },
    { name: 'orange',       code: 0xF98026 },
    { name: 'magenta',      code: 0xC74EBD },
    { name: 'light_blue',   code: 0x3AB3DA },
    { name: 'yellow',       code: 0xFED83D },
    { name: 'lime',         code: 0x80C726 },
    { name: 'pink',         code: 0xF38BAA },
    { name: 'gray',         code: 0x474F52 },
    { name: 'light_gray',   code: 0x9D9D97 },
    { name: 'cyan',         code: 0x269C9C },
    { name: 'purple',       code: 0x8932B8 },
    { name: 'blue',         code: 0x3C44AA },
    { name: 'brown',        code: 0x835432 },
    { name: 'green',        code: 0x5E7C26 },
    { name: 'red',          code: 0xB02E26 },
    { name: 'black',        code: 0x262626 },
]
