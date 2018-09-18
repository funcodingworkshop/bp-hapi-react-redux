export function createBemClassFactory(block) {
  return (element, modificator) => {
    if (!element) return block;
    const baseName = `${block}__${element}`;
    return modificator ? `${baseName} ${baseName}_${modificator}` : baseName;
  };
}
