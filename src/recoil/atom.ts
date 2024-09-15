import { atom } from "recoil";

// Utility function to sync with localStorage
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any, _: any, isReset: boolean) => {
    isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const cartState = atom({
  key: "cartState",
  default: false,

});

export const cartItemState = atom({
  key: "cartItemState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("cartItemState")], // Use localStorageEffect
});
