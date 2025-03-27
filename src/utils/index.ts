import axios from "axios";
import sourceMap from "source-map-js";
// 获取线上sourceMap文件
const getSourceMap = async (url: string) => {
  return await axios.get(url);
};
export const findCodeBySourceMap = async (stackFrame: any) => {
  console.log(stackFrame, "stackFrame");
  // 获取文件
  const sourcemap = await getSourceMap(stackFrame.fileName + ".map");
  console.log(sourcemap, "sourcemap");

  // 读取data
  const fileContent = sourcemap.data;
  console.log(fileContent, "fileContent");

  // 解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(fileContent);
  console.log(consumer, "consumer");
  // 通过报错位置查找源文件名称以及报错行号
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber,
  });
  const code = consumer.sourceContentFor(originalPosition.source);
  console.log(code, "还原错误代码");
};
