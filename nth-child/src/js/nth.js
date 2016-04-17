/*
* @Author: baby
* @Date:   2016-04-15 14:24:46
* @Last Modified by:   baby
* @Last Modified time: 2016-04-15 14:35:39
*/

$(function () {
  // 第二个元素
  var span2 = $('#test span:nth-child(2)');
  console.log(span2.html());
  var first = $('#test span:first-child');
  var last = $('#test span:last-child');
  console.log(first.text());
  console.log(last.text());

  // 输出结果:
  //
  // 第2个普通的文字
  // 第1个普通的文字
  // 最后1个普通的文字
});
