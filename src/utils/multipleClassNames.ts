export default function multipleClassNames(...classes: string[]): string {
  return [...classes].join(' ');
}
