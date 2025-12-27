// --- Tính chiều rộng của chuỗi theo pixel ---
String.prototype.pxWidth = function (font) {
	let canvas = String.prototype.pxWidth.canvas ||
		(String.prototype.pxWidth.canvas = document.createElement("canvas")),
		context = canvas.getContext("2d");

	if (font) context.font = font;

	let metrics = context.measureText(this);
	return metrics.width;
}

// --- Kiểm tra ký tự có phải số ---
function isNumber(str) {
	return !isNaN(parseInt(str));
}

// --- Lấy chuỗi thuần, loại bỏ các pause kiểu ^1000 ---
function getPureStr(str) {
	let spices = str.split('^');
	let res = spices[0];
	for (let i = 1; i < spices.length; i++) {
		let tmp = spices[i];
		if (isNumber(tmp.charAt(0))) {
			let rm = parseInt(tmp).toString();
			tmp = tmp.substring(rm.length);
		} else {
			tmp = '^' + tmp;
		}
		res += tmp;
	}
	return res;
}

// --- Căn giữa trái tim ---
function loadingPage() {
	let heart_div = $('.heart');
	let heart_parent = heart_div.parent();
	let page_width = heart_parent.width();
	let page_height = heart_parent.height();
	let heart_width = heart_div.width();
	let heart_height = heart_div.height();

	heart_div.css('top', (page_height - heart_height) / 2);
	heart_div.css('left', (page_width - heart_width) / 2);
}

// --- Xử lý mở thư ---
$("#open").click(function () {
	if (!envelope_opened) {

		// Hiển thị sáp
		$('#wax-half').css('display', "block");

		// Lấy thẻ .letter
		let letterDiv = document.querySelector('.letter');
		letterDiv.style.height = "210px";       // chiều cao ban đầu
		letterDiv.style.overflowY = "auto";     // scroll nếu chữ dài
		letterDiv.style.padding = "10px";
		letterDiv.style.boxSizing = "border-box";

		// Typed.js đánh chữ
		new Typed('.letter', {
			strings: [
				"^1000" + content.recipient + "<br><br>" +
				content.text + "<br><br><p style='float:right; display:block; width:" +
				content.sign + "px;'>^1000" + content.from + "</p>"
			],
			typeSpeed: 100,
			backSpeed: 50,
			// --- Scroll theo text ---
			onStringTyped: function(self) {
				requestAnimationFrame(() => {
					letterDiv.scrollTop = letterDiv.scrollHeight;
				});
			},
			onTypingPaused: function(self) {
				requestAnimationFrame(() => {
					letterDiv.scrollTop = letterDiv.scrollHeight;
				});
			}
		});

		// Thay đổi hiệu ứng nút mở thư
		$('#open').find("span").eq(0).css('background-position', "0 -150px");

		envelope_opened = true;

		// Phát nhạc nền nếu chưa chạy
		let player = document.getElementById('music');
		if (player.paused) {
			player.play();
			$('#music_btn').css("display", "block");
		}
	}
});
