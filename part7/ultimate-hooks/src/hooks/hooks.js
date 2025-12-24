import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue("");

  return { type, value, onChange, reset };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data));
  }, [baseUrl]);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);

    setResources((prev) => prev.concat(res.data));
  };

  const service = {
    create,
  };

  return [resources, service];
};
