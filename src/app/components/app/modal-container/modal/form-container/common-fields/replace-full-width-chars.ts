export function replaceFullWidthChars(str: string): string {
    let chars = str;
    if (chars == null) {
        chars = '';
    }
    const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';
    let value = '';
    const sum = chars.split('');
    for (let i = 0, len = sum.length; i < len; i++) {
        let chr = sum[i];
        const idx = fullWidth.indexOf(chr);
        if (idx > -1) {
            chr = halfWidth[idx];
        }
        value += chr;
    }
    return value;
}
