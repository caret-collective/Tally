/**
 * Locale messages for vi-VN (Vietnamese)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Bộ đếm từ' as const;
const DESCRIPTION =
	'Bộ đếm từ chế độ tối yêu thích của bạn, nay có thêm tính năng kiểm tra ngữ pháp!' as const;
const AUTO_LABEL = 'Tự động' as const;

const messages: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Đếm tức thì số ký tự, từ, câu, đoạn văn và dòng trong văn bản của bạn với ${SITE.title}.`,
		features: ['Đếm từ', 'Đếm ký tự', 'Thống kê ký tự'],
		requirements: 'Yêu cầu trình duyệt web hiện đại',
		keywords: [
			'bộ đếm ký tự',
			'bộ đếm từ',
			'bộ đếm câu',
			'bộ đếm đoạn văn',
			'bộ đếm dòng',
			'phân tích văn bản',
			'trình phân tích văn bản',
			'thống kê văn bản',
			'công cụ trực tuyến',
		],
	},
	icon: {
		license: {
			label: 'Giấy phép',
		},
		sponsorOnly: {
			label: 'Chỉ dành cho nhà tài trợ',
		},
		experimental: {
			label: 'Thử nghiệm',
		},
	},
	alert: {
		note: {
			title: 'Ghi chú',
		},
		warning: {
			title: 'Cảnh báo',
		},
		error: {
			title: 'Lỗi',
		},
	},
	header: {
		label: `Trang chủ ${SITE.title}`,
	},
	input: {
		label: 'Ô nhập văn bản',
		placeholder: 'Con mèo nâu nhanh nhẹn nhảy qua chú chó lười biếng...',
		largeInputWarning: {
			message:
				'Bạn đã nhập một lượng văn bản lớn. Điều này có thể gây ra vấn đề về hiệu năng. Bạn có muốn tiếp tục không?\n\n(Bạn có thể tắt cảnh báo này trong phần tùy chọn.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Ký tự',
			},
			words: {
				label: 'Từ',
			},
			sentences: {
				label: 'Câu',
			},
			paragraphs: {
				label: 'Đoạn văn',
			},
			lines: {
				label: 'Dòng',
			},
			spaces: {
				label: 'Khoảng trắng',
			},
			letters: {
				label: 'Chữ cái',
			},
			digits: {
				label: 'Chữ số',
			},
			punctuation: {
				label: 'Dấu câu',
			},
			symbols: {
				label: 'Ký hiệu',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Xem mã nguồn',
			tooltip: 'Xem mã nguồn trên GitHub',
		},
		reportIssue: {
			label: 'Báo cáo sự cố',
			tooltip: 'Báo cáo một sự cố',
		},
		sponsor: {
			label: 'Tài trợ tôi',
			tooltip: 'Tài trợ cho dự án này',
		},
		moreProjects: {
			label: 'Dự án khác',
			tooltip: 'Xem thêm các dự án khác của tôi',
		},
	},
	option: {
		locale: {
			title: 'Ngôn ngữ',
		},
		general: {
			title: 'Tùy chọn',
			map: {
				rememberInputText: {
					label: 'Ghi nhớ văn bản đã nhập',
				},
				warnOnLargeInputText: {
					label: 'Cảnh báo khi văn bản nhập lớn',
				},
				enableLinting: {
					label: 'Bật kiểm tra ngữ pháp',
				},
				enableDebugLogging: {
					label: 'Bật ghi nhật ký gỡ lỗi',
				},
			},
		},
		lintingRegion: {
			title: 'Khu vực kiểm tra ngữ pháp',
			unsupportedWarning: {
				tooltip: 'Kiểm tra ngữ pháp không khả dụng cho ngôn ngữ này',
			},
			map: {
				auto: {
					label: AUTO_LABEL,
				},
			},
		},
		theme: {
			title: 'Giao diện',
			map: {
				auto: {
					label: AUTO_LABEL,
				},
				amoled: {
					label: 'AMOLED',
				},
				light: {
					label: 'Sáng',
				},
				dark: {
					label: 'Tối',
				},
				teal: {
					label: 'Teal',
				},
				dusk: {
					label: 'Hoàng hôn',
				},
				solarizedLight: {
					label: 'Solarized Sáng',
				},
				solarizedDark: {
					label: 'Solarized Tối',
				},
				gruvboxLight: {
					label: 'Gruvbox Sáng',
				},
				gruvboxDark: {
					label: 'Gruvbox Tối',
				},
				catppuccinLatte: {
					label: 'Catppuccin Latte',
				},
				catppuccinMocha: {
					label: 'Catppuccin Mocha',
				},
				nord: {
					label: 'Nord',
				},
				dracula: {
					label: 'Dracula',
				},
			},
		},
	},
} as const satisfies LocaleMessages;

export default messages;
