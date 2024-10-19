import { chat } from "./utils/groq";
import { useState } from "react";
import Select from "./components/Select";
import github_logo from "./assets/github-mark.png"
import "./App.css";
import ResultBox from "./components/ResultBox";

function App() {
  const id = ["Hastags", "Tone", "Length"];
  let timer;

  const [data, setData] = useState("");
  const [parameter, setParameter] = useState({
    Hastags: "No hastags",
    Tone: "Default",
    Length: "Short",
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false)


  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    clearTimeout(timer);
    if (content.value.length === 0) {
      setIsEmpty(true);
      setIsLoading(false);
    } else {
      timer = setTimeout(async () => {
        setIsEmpty(false);
        const ai = await chat(content.value, parameter, isEmoji)
        setData(ai.choices[0].message.content)
        setShowResultBox(true)
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleParam = async (value, id) => {
    setParameter((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleEmoji = async () => {
    setIsEmoji(!isEmoji);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async() =>{
    setShowResultBox(false)
  }



  return (
    <main>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="flex">
        <a href="https://github.com/ifs20004-itdel/CaptionCraft">
          <img src={github_logo} alt="Repository" width={35} height={35} />
        </a>
      </div>
      <div className="flex flex-row gap-20 mt-12">
        <div className="w-3/5">
          <h1 className="text-5xl text-indigo-500 font-poppins font-extrabold">
            CAPTIONCRAFT
          </h1>
          <p className="content-start pt-4 pb-2 font-light">
            CaptionCraft is an AI-powered platform designed to elevate your
            social media caption. With the cutting-edge integration of LLM
            (Large Language Model) technology, CaptionCraft helps you
            effortlessly create captivating and tailored captions for any social
            media post. Whether you're promoting a product, sharing personal
            moments, or growing your brand, CaptionCraft provides intelligent
            suggestions that align with your tone, audience, and style.
          </p>
          <p className="pt-2 pb-4 font-light">
            Say goodbye to writer's block and let our AI-powered tool enhance
            your posts, ensuring they always stand out. Engage, inspire, and
            grow with captions crafted to perfection!
          </p>
          <div className="flex flex-col">
            <form className="flex flex-col py-2">
              {isEmpty ? (
                <div className="">
                  <textarea
                    id="content"
                    placeholder="Describe your caption"
                    type="text"
                    rows={5}
                    className="w-full py-2 px-4 text-md rounded-md border-2 border-red-600"
                  />
                  <p className="text-red-600 text-sm py-0.5">
                    This field is required
                  </p>
                </div>
              ) : (
                <textarea
                  id="content"
                  placeholder="Describe your caption"
                  type="text"
                  rows={5}
                  className="py-2 px-4 text-md rounded-md "
                />
              )}
              <button
                onClick={handleSubmit}
                type="button"
                className="my-4 bg-indigo-500 hover:bg-indigo-700 py-2 px-4 rounded-md font-bold text-white"
              >
                {isLoading ? (
                  <i class="fa fa-spinner fa-spin"></i>
                ) : (
                  "Generate Caption"
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="w-3/5 m-5">
          <div className="flex flex-col max-w-sm gap-5 ">
            <Select
              type={id[0]}
              optionList={[
                "No hashtags",
                "3 hashtags",
                "5 hashtags",
                "7 hashtags",
                "10 hashtags",
              ]}
              onChange={(e) => handleParam(e.target.value, id[0])}
            />
            <Select
              type={id[1]}
              optionList={[
                "Default",
                "Formal",
                "Casual",
                "Professional",
                "Diplomatic",
                "Funny",
                "Engaging",
                "Direct",
                "Cute",
                "Cool",
                "Informative",
              ]}
              onChange={(e) => handleParam(e.target.value, id[1])}
            />
            <Select
              type={id[2]}
              optionList={["Short", "Long"]}
              onChange={(e) => handleParam(e.target.value, id[2])}
            />
            <div>
              <p className="text-gray-900 text-sm font-medium">Emojis</p>
              <div className="flex flex-row gap-5 mt-2 items-center">
                <div class="relative inline-block w-11 h-5">
                  <input
                    onChange={handleEmoji}
                    id="emojis"
                    type="checkbox"
                    class="peer appearance-none w-12 h-5 bg-slate-400 rounded-full checked:bg-blue-600 cursor-pointer transition-colors duration-300"
                  />
                  <label
                    for="emojis"
                    class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-7 peer-checked:border-blue-600 cursor-pointer"
                  ></label>
                </div>
                <p className="font-light">Add emojis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center font-light mt-7">© Samuel Immanuel Herlinton Sibuea. All rights reserved.</p>

      {
        showResultBox &&
          <ResultBox
          data={data}
          handleClose={handleClose}
        />
      }
    </main>
  );
}

export default App;
