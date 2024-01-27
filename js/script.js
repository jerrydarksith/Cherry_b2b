$(document).ready(function () {
  $(".lazy").lazyload();
  $(".animated").lazyload();

  // Примитивный скрипт для  демонстрации работы счетчиков на странице, клик по кнопках "-" "+" с сумированием результата по каждому клику
  // Получаем все счетчики на странице
//   const counterContainers = document.querySelectorAll(".vi-counter");

//   // Поиск по  кажому счетчику с добавлением события
//   counterContainers.forEach((counterContainer) => {
//     const decrementButton = counterContainer.querySelector(".decrement");
//     const incrementButton = counterContainer.querySelector(".increment");
//     const counterInput = counterContainer.querySelector(".vi-count-input");

//     decrementButton.addEventListener("click", () => {
//       const currentValue = parseInt(counterInput.value);
//       if (currentValue > 0) {
//         counterInput.value = currentValue - 1;
//       }
//     });

//     incrementButton.addEventListener("click", () => {
//       const currentValue = parseInt(counterInput.value);
//       counterInput.value = currentValue + 1;
//     });
//   });
  // Функция для "range" cслайдера(Ползунки)
  //Каждый новый слайдер должен иметь свою ID
  function createSlider(element) {
    const inputs = element.querySelectorAll("input");
    const thumbLeft = element.querySelector(".thumb.left");
    const thumbRight = element.querySelector(".thumb.right");
    const rangeBetween = element.querySelector(".range-between");
    const labelMin = element.querySelector(".range-label-start");
    const labelMax = element.querySelector(".range-label-end");
    const [inputStart, inputEnd] = inputs;

    function setLabelValue(label, input) {
      label.innerHTML = `${input.value}`;
    }

    function setStartValueCustomSlider(inputStart, inputEnd, pseudoEl, range) {
      const maximum = Math.min(
        parseInt(inputStart.value),
        parseInt(inputEnd.value) - 1
      );
      const percent =
        ((maximum - inputStart.min) / (inputStart.max - inputStart.min)) * 100;
      pseudoEl.style.left = percent + "%";
      range.style.left = percent + "%";
    }

    function setEndValueCustomSlider(inputEnd, inputStart, pseudoEl, range) {
      const minimun = Math.max(
        parseInt(inputEnd.value),
        parseInt(inputStart.value) + 1
      );
      const percent =
        ((minimun - inputEnd.min) / (inputEnd.max - inputEnd.min)) * 100;
      pseudoEl.style.right = 100 - percent + "%";
      range.style.right = 100 - percent + "%";
    }

    function setEvents(
      inputStart,
      inputEnd,
      thumbLeft,
      thumbRight,
      labelMin,
      labelMax,
      rangeBetween
    ) {
      inputStart.addEventListener("input", () => {
        setStartValueCustomSlider(
          inputStart,
          inputEnd,
          thumbLeft,
          rangeBetween
        );
        setLabelValue(labelMin, inputStart);
      });

      inputEnd.addEventListener("input", () => {
        setEndValueCustomSlider(inputEnd, inputStart, thumbRight, rangeBetween);
        setLabelValue(labelMax, inputEnd);
      });

      inputStart.addEventListener("mouseover", function () {
        thumbLeft.classList.add("hover");
      });
      inputStart.addEventListener("mouseout", function () {
        thumbLeft.classList.remove("hover");
      });
      inputStart.addEventListener("mousedown", function () {
        thumbLeft.classList.add("active");
      });
      inputStart.addEventListener("pointerup", function () {
        thumbLeft.classList.remove("active");
      });

      inputEnd.addEventListener("mouseover", function () {
        thumbRight.classList.add("hover");
      });
      inputEnd.addEventListener("mouseout", function () {
        thumbRight.classList.remove("hover");
      });
      inputEnd.addEventListener("mousedown", function () {
        thumbRight.classList.add("active");
      });
      inputEnd.addEventListener("pointerup", function () {
        thumbRight.classList.remove("active");
      });

      inputStart.addEventListener("touchstart", function () {
        thumbLeft.classList.add("active");
      });
      inputStart.addEventListener("touchend", function () {
        thumbLeft.classList.remove("active");
      });
      inputEnd.addEventListener("touchstart", function () {
        thumbRight.classList.add("active");
      });
      inputEnd.addEventListener("touchend", function () {
        thumbRight.classList.remove("active");
      });
    }

    setStartValueCustomSlider(inputStart, inputEnd, thumbLeft, rangeBetween);
    setEndValueCustomSlider(inputEnd, inputStart, thumbRight, rangeBetween);
    setEvents(
      inputStart,
      inputEnd,
      thumbLeft,
      thumbRight,
      labelMin,
      labelMax,
      rangeBetween
    );
  }
  // Поиск всех слайдеров на странице
  const sliders = document.querySelectorAll(".range-slider");
  // Создание слайдера для каждого елемента(ID)
  sliders.forEach((slider) => {
    createSlider(slider);
  });
  //    Кнопки в фильтре показать больше и скрыть чередование по клику
  $(".button-pair").each(function () {
    var pair = $(this);
    var showMoreButton = pair.find(".vi-show-more-button");
    var showLessButton = pair.find(".vi-show-less-button");
    showMoreButton.click(function () {
      showLessButton.removeClass("vi-hide");
      showMoreButton.addClass("vi-hide");
    });
    showLessButton.click(function () {
      showMoreButton.removeClass("vi-hide");
      showLessButton.addClass("vi-hide");
    });
    // По клику скрывается одна кнопка, появляется другая -чередование.
  });
  $(".vi-filter-panel__container").each(function () {
    var container = $(this);
    var elements = container.find(".vi-filter-panel__element");
    var buttonPair = container.find(".button-pair");
    if (elements.length <= 4) {
      buttonPair.addClass("vi-hide");
      //   Отображение кнопок "показать больше" и "скрыть"- если в блоке 4 елемента или меньше-кнопки не отображаются.
      // Скрываеться сам блок с кнопками
    }
  });
$(".vi-filter-panel").each(function () {
    var panel = $(this);
    var container = panel.find(".vi-filter-panel__container");
    panel.find(".vi-filter-panel__title").click(function () {
        container.toggleClass("vi-open");
    });
});
$('.vi-filter-panel__title').click(function() {
	var currentElement = $(this);
	currentElement.toggleClass('vi-close');
  });
  $(".vi-filter-panel__container").each(function () {
    var container = $(this);
    var elements = container.find(".vi-filter-panel__element");
    if (elements.length >= 4) {
      elements.slice(4).addClass("vi-hide");
    }
  });
  $(".vi-show-more-button").click(function () {
    var panel = $(this).closest(".vi-filter-panel");
    var container = panel.find(".vi-filter-panel__container");
    var elements = container.find(".vi-filter-panel__element");
    // при клике по кнопке показать больше -показываются все елементы которые в блоке
    elements.removeClass("vi-hide");
  });
  $(".vi-show-less-button").click(function () {
    var panel = $(this).closest(".vi-filter-panel");
    var container = panel.find(".vi-filter-panel__container");
    var elements = container.find(".vi-filter-panel__element");

    if (elements.length >= 4) {
      elements.slice(4).addClass("vi-hide");
    }
    // при клике по кнопке свернуть -показываются только первые 4 елемента в  блоке
  });
  $("#menu-open").click(function () {
    $(".vi-submenu").toggleClass("vi-submenu--active");
  });
  $("#open-search").click(function () {
    $(".vi-search-panel").toggleClass("vi-search-panel--active");
  });
  $(".vi-close-button-search").click(function () {
    $(".vi-search-panel").removeClass("vi-search-panel--active");
  });
//   $("#open-gamburger").click(function () {
// 	$("aside").toggleClass("vi-show");
// 	$("header, footer, main").toggleClass("vi-not-show");
// 	// Добавление запрета скрола при активном гамбургере
//   });
//   $(".vi-close-button-hamburger").click(function () {
//     $("aside").removeClass("vi-show");
//     $("header, footer, main").removeClass("vi-not-show"); 
// 	// Снятие запрета
//   });

$("#open-gamburger").click(function () {
	if ($("aside").hasClass("vi-show")) {
	  // Якщо блок видимий, то видаляємо клас "vi-show" та анімуємо зникнення
	  $("aside").animate({ opacity: 0, height: 0 }, 500, function () {
		$(this).css("display", "none").removeClass("vi-show");
		$("header, footer, main").removeClass("vi-not-show");
		// Видаляємо атрибути style
		$(this).removeAttr("style");
	  });
	} else {
	  // Якщо блок прихований, то показуємо його анімацією
	  $("aside").css("display", "block").addClass("vi-show").animate({ opacity: 1, height: "auto" }, 500);
	  $("header, footer, main").addClass("vi-not-show");
	}
  });
  
  $(".vi-close-button-hamburger").click(function () {
	// При кліку на кнопку закриття гамбургера, видаляємо клас "vi-show" та анімуємо зникнення
	$("aside").animate({ opacity: 0, height: 0 }, 500, function () {
	  $(this).css("display", "none").removeClass("vi-show");
	  $("header, footer, main").removeClass("vi-not-show");
	  // Видаляємо атрибути style
	  $(this).removeAttr("style");
	});
  });
  
  

  $("#open-filter").click(function () {
    $(".vi-for-filter").toggleClass("vi-catalog__item--active");
  });
  $("#open-filter").click(function () {
    $(".vi-content").toggleClass("vi-hidden");
  });
  $("#open-filter").click(function () {
    $(".vi-footer-container").toggleClass("vi-hidden");
  });
  $("#open-filter").click(function () {
    const hideText = $(this).find("span:first-child");
    hideText.toggle();
  });
  //Добавление класа который изменяет состояние самих кнопок при включение компактного вида
  $(".vi-filter__item").click(function () {
    $(".vi-filter__item--active").removeClass("vi-filter__item--active");
    $(this).addClass("vi-filter__item--active");
  });
  // Добавление компактного меню
  $(".vi-filter__item:nth-child(1)").click(function () {
    $(".vi-product-list__item").removeClass("vi-compact");
	$(".vi-catalog-title").removeClass("vi-compact");
  });
  $(".vi-filter__item:nth-child(2)").click(function () {
    $(".vi-product-list__item").addClass("vi-compact");
	$(".vi-catalog-title").addClass("vi-compact");
  });
  //Сброс отмеченых чекбоксов
  $(".vi-filter-key__reset").click(function () {
    $(".vi-filter-container input[type='checkbox']").prop("checked", false);
  });
// Установка значения скрола при котором добавляется нужный клас
var scrollThreshold = 240;
  // Обработчик события скролла относительно окна
$(window).scroll(function() {
	// Получаем текущее значения скролла
	var scrollTop = $(window).scrollTop();
	// Елемент к которому будет добавлятся указаный класс
	var element = $('.vi-catalog__container');
	// Проверка достиг ли скрол указаного значения
	if (scrollTop >= scrollThreshold) {
	  // Добавление указанного класса
	  element.addClass('vi-catalog__container--active');
	} else {
	  // Удаление указаного класа если скролл меньше установленого значения
	  element.removeClass('vi-catalog__container--active');
	}
  });
   $('.vi-catalog-title-sort').click(function() {
	if (!$(this).hasClass('up')) {
		$(this).addClass('up');
	} else {
		$(this).removeClass('up');
	}
});
$(document).ready(function() {
	var customSelect = $("#profile__select");
	var selectedElement = customSelect.find(".vi-select__selected");
	var selectItems = customSelect.find(".vi-select__items");
	selectedElement.click(function() {
	  customSelect.toggleClass("open");
	  if (customSelect.hasClass("open")) {
		selectItems.css("max-height", selectItems[0].scrollHeight + "px");
	  } else {
		selectItems.css("max-height", "0");
	  }
	});
	selectItems.on("click", ".vi-select-item", function() {
	  var selectedValue = $(this).text();
	  selectedElement.find("span:first").text(selectedValue); 
	  customSelect.removeClass("open");
	  selectItems.css("max-height", "0"); 
	});
	$(document).click(function(e) {
	  if (!customSelect.is(e.target) && customSelect.has(e.target).length === 0) {
		customSelect.removeClass("open");
		selectItems.css("max-height", "0"); 
	  }
	});
  });
  $(document).ready(function () {
	var $cartTotalElement = $('.vi-cart-total');
	function handleScroll() {
	  var windowHeight = $(window).height();
	  var documentHeight = $(document).height();
	  var scrollPosition = $(window).scrollTop();
	  if (scrollPosition + windowHeight >= documentHeight) {
		$cartTotalElement.addClass('vi-reached-bottom');
	  } else {
		$cartTotalElement.removeClass('vi-reached-bottom');
	  }
	}
	$(window).scroll(handleScroll);
  });
  $(".vi-cart-panel__title").click(function() {
	var container = $(this).siblings(".vi-cart-panel__container");
	if (container.hasClass("vi-show")) {
	  container.removeClass("vi-show");
	} else {
	  container.addClass("vi-show");
	}
  });
  $('#order').click(function() {
	$('.vi-goods, .vi-cart-title, .vi-goods-list, .vi-payment').toggleClass('vi-modify');
  });
  var scrollThreshold = 240;
  // Обработчик события скролла относительно окна
$(window).scroll(function() {
	// Получаем текущее значения скролла
	var scrollTop = $(window).scrollTop();
	// Елемент к которому будет добавлятся указаный класс
	var element = $('.vi-cart__container');
	// Проверка достиг ли скрол указаного значения
	if (scrollTop >= scrollThreshold) {
	  // Добавление указанного класса
	  element.addClass('vi-cart__container--active');
	} else {
	  // Удаление указаного класа если скролл меньше установленого значения
	  element.removeClass('vi-cart__container--active');
	}
  });

  // Обробник події для кліку на кнопку з класом "increment" в кожному блоку ".vi-counter"
//   $(".vi-counter").each(function() {
// 	var $counter = $(this);
// 	var $countInput = $counter.find(".vi-count-input");
	
// 	$counter.find(".increment").on("click", function() {
// 		var count = parseInt($countInput.val()) || 0;
// 		// count++;
// 		$countInput.val(count);
		
// 		// Знаходимо елементи з класом ".icon.animated" на всій сторінці і оновлюємо їх
// 		var $icons = $(".icon.animated");
// 		$icons.each(function() {
// 			var $icon = $(this);
// 			var currentCount = parseInt($icon.attr("data-count")) || 0;
// 			$icon.attr("data-count", currentCount + 1);
// 			$icon.addClass("active");
// 		});
// 	});
// });
var zeroCounterCount = 0; // Змінна для відстеження лічильників з нульовим значенням

$(".vi-counter").each(function() {
	var $counter = $(this);
	var $countInput = $counter.find(".vi-count-input");
	
	$counter.find(".increment").on("click", function() {
		var count = parseInt($countInput.val()) || 0;
		count++;
		$countInput.val(count);
		
		// Знаходимо елементи з класом ".icon.animated" на всій сторінці і оновлюємо їх
		var $icons = $(".icon.animated");
		$icons.each(function() {
			var $icon = $(this);
			var currentCount = parseInt($icon.attr("data-count")) || 0;
			$icon.attr("data-count", currentCount + 1);
			$icon.addClass("active");
		});

		// Якщо лічильник був 0, зменшуємо кількість лічильників з нульовим значенням
		if (count === 1) {
			zeroCounterCount--;
		}
	});

	$counter.find(".decrement").on("click", function() {
		var count = parseInt($countInput.val()) || 0;
		if (count > 0) {
			count--;
			$countInput.val(count);
			
			// Віднімаємо 1 від "data-count" для елементів з класом ".icon.animated"
			var $icons = $(".icon.animated");
			$icons.each(function() {
				var $icon = $(this);
				var currentCount = parseInt($icon.attr("data-count")) || 0;
				currentCount--; // Віднімаємо 1
				$icon.attr("data-count", currentCount);
				
				// Якщо лічильник став 0, збільшуємо кількість лічильників з нульовим значенням
				if (count === 0) {
					zeroCounterCount++;
				}
			});
		}

		// Якщо всі лічильники на сторінці мають значення 0, видаляємо клас "active"
		if (zeroCounterCount === 0) {
			$icons.removeClass("active");
		}
	});
});
});