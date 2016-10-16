

let MoodPicker = Backbone.View.extend({

  events: {
    'click .mood-edit': 'showPicker',
  },

  showPicker: function (ev) {
    ev.preventDefault()
    $('.mood', this.el).hide()
    $('.mood-picker', this.el).show()
  },
})

let PollQuestion = Backbone.View.extend({

  events: {
    'mouseover .rate-picker > div': 'onStarOver',
    'mouseleave .rate-picker': 'onStarOut',
    'click .rate-picker > div': 'onStarClick',
    'click .row-equal > div > a': 'onAddMoreClick',
  },

  onAddMoreClick: function (ev) {
    ev.preventDefault()
    $(ev.target).hide();
    $('textarea', this.el).show()
  },

  onStarClick: function (ev) {
    ev.preventDefault()
    let $el = $(ev.currentTarget)
    let rate = $el.data('rate')
console.log(ev.target, ev.currentTarget);
    this.model.set('rate', rate)
    $(':input.rate', this.el).val(rate)

    $('.rate-picker > div', this.el).each((i, el) => {
      if (i < rate) {
        $(el).addClass('active')
      } else {
        $(el).removeClass('active')
      }
    })

    $('.row-equal > div > a',  this.el).show()

    if (rate < 3) {
      $('.row-equal > div > a').hide()
      $('textarea', this.el).show()
    } else {
      $('textarea', this.el).hide()
    }

    let valid = true

    $(':input.rate').each((i, el) => {
      if ($(el).val() < 1) {
        valid = false
      }
    })
    $(':input.submit').attr('disabled', !valid)
  },

  onStarOver: function (ev) {
    ev.preventDefault()
    let $el = $(ev.target)
    let rate = $el.data('rate')
	  
    if (rate === undefined) {
      return
    }
    $('.rate-picker > div', this.el).each((i, el) => {
      if (i < rate) {
        $(el).addClass('active')
	      
	      if (i + 1 === rate) {
          $(el).addClass('selected');
	      } else {
          $(el).removeClass('selected');
	      }
      } else {
        $(el).removeClass('active')
        $(el).removeClass('selected');
      }
    })
  },

  onStarOut: function (ev) {
    ev.preventDefault()
    let rate = this.model.get('rate')

    $('div', ev.currentTarget).each((i, el) => {
      if (rate > 0 && i < rate) {
        $(el).addClass('active')
	if (i + 1 === rate) {
          $(el).addClass('selected');
	} else {
          $(el).removeClass('selected');
	}
      } else {
        $(el).removeClass('active')
        $(el).removeClass('selected')
      }
    })
  },
});

let moodPicker = new MoodPicker({
  el: document.getElementById('mood-picker'),
  model: new Backbone.Model(),
})

let questions = document.querySelectorAll('.poll-question')

for (let q of questions) {
  let v = new PollQuestion({
    el: q,
    model: new Backbone.Model({rate: 0}),
  })
}

