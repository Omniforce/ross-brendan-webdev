(function() {
	angular
		.module("WebAppMaker")
		.directive("jgaSortable", jgaSortable);

	function jgaSortable($routeParams, WidgetService) {

		var initialIndex;
		var pageId;

		function link(scope, element, attr) {
			$(element).sortable({
				handle: ".drag",
				start: onStart,
				update: onUpdate
			});

			pageId = $routeParams["pid"];
		}

		function onStart(event, ui) {
			initialIndex = ui.item.index();
		}

		function onUpdate(event, ui) {
			var finalIndex = ui.item.index();

			WidgetService.updateWidgetOrder(pageId, initialIndex, finalIndex).then(success, error);
		}

		function success(response) { }
		function error(response) { console.log(response); }

		return {
			link: link
		};
	}
}());
