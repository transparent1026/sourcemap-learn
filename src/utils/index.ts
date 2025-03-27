import axios from "axios";
import sourceMap from "source-map-js";
// 获取线上sourceMap文件
const getSourceMap = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
export const findCodeBySourceMap = async (stackFrame: any) => {
  // 获取文件
  const sourcemap = await getSourceMap(stackFrame.fileName + ".map");
  // 读取data
  const fileContent = sourcemap.data;
  // 解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(fileContent);
  // 通过报错位置查找源文件名称以及报错行号
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber,
  });
  const code = consumer.sourceContentFor(originalPosition.source);
  console.log(code, "还原错误代码");
};
