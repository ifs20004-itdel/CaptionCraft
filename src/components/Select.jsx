const Select = ({ type, optionList, onChange }) => {
  return (
    <form>
      <label
        for={type}
        className="block mb-2 text-xs md:text-sm font-medium text-gray-900"
      >
        {type}
      </label>
      <select
        onChange={onChange}
        defaultValue={optionList[0]}
        id={type}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {optionList.map((item, idx) => (
          <option key={idx}>
            <p className="text-xs md:text-base">{item}</p>
          </option>
        ))}
      </select>
    </form>
  );
};

export default Select;
