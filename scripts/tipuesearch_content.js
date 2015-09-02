---
insearch: false
---

var tipuesearch = {"pages": [
	{% for page in site.pages %}
		{% if page.insearch != false or page.insearch == nil %}
  		{% if page.url contains "/resume/" %}
      	{% capture text %}{% for job in site.data.jobs %}{{ job.employer }}, {{ job.description }}{% if forloop.rindex0 > 0 %}; {% endif %}{% endfor %}{% endcapture %}
  		{% else %}
      	{% assign text = page.content %}
  		{% endif %}
  	{"title": "{{ page.title }}","text": {{ text | jsonify | strip_html }}, "tags": "{% if page.tags %}{% for tag in page.tags %}{{ tag }}{% if forloop.rindex0 > 0 %}, {% endif %}{% endfor %}{% endif %}","url":"{{ page.url }}"},
		{% endif %}
	{% endfor %}
	{% for article in site.collections.articles.docs %}
 		{% if article.insearch != false or page.insearch == nil %}
 			{"title": "{{article.title}}", "text": {{article.content | jsonify | strip_html }}, "tags": "{% if article.tags %}{% for tag in article.tags %}{{tag}}{% if forloop.rindex0 > 0 %}, {% endif %}{% endfor %}{% endif %}", "url": "{{article.url}}"}{% if forloop.rindex0 > 0 %},{% endif %}
 		{% endif %}
 	{% endfor %}
]};