export function isIpValid(ip: string): boolean {
  if (!/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip)) {
    return false;
  }
  const octets = ip.split('.').map(Number);
  return octets.every(octet => octet >= 0 && octet <= 255);
}

export function getNetworkAddress(ip: string, mask: string): string {
  const ipOctets = ip.split('.').map(Number);
  const maskOctets = mask.split('.').map(Number);
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(ipOctets[i] & maskOctets[i]);
  }
  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
}

export function getAddressesCount(mask: string): number {
  let binaryMask = '';
  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  const zeros = 32 - binaryMask.replaceAll('1', '').length;
  if (zeros === 0) return 1;
  if (zeros === 1) return 2;
  return Math.pow(2, zeros) - 2;
}