export const selectClassNames = {
  control: (state: { isFocused: boolean; }) =>
    [
      "w-full rounded-md border px-3 flex",
      state.isFocused
        ? "border-indigo-500 ring-2 ring-indigo-100"
        : "border-zinc-300",
    ].join(" "),
  valueContainer: () => "py-1",
  input: () => "text-zinc-900",
  singleValue: () => "text-zinc-900",
  placeholder: () => "text-zinc-500",
  menu: () =>
    "mt-0 rounded-md border border-zinc-200 bg-white shadow-lg",
  menuList: () => "max-h-60 overflow-auto py-1",
  option: (state: { isFocused: boolean; isSelected: boolean; }) =>
    [
      "px-3 py-2",
      state.isFocused ? "bg-zinc-100" : "",
      state.isSelected ? "bg-indigo-50 text-indigo-900" : "text-zinc-900",
    ]
      .filter(Boolean)
      .join(" "),
  clearIndicator: () => "mx-2 w-4 h-full text-zinc-400 hover:text-indigo-500 flex items-center cursor-pointer",
  dropdownIndicator: () => "ml-2 w-4 h-full text-zinc-400 hover:text-indigo-500 flex items-center cursor-pointer",
  indicatorSeparator: () => "mx-1 my-2 bg-zinc-300",
}