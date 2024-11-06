# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': "K8 Hierachy",
    'summary': """
        This view provides a comprehensive, hierarchical structure of budget categories, showcasing a clear breakdown of investments and expenses across various departments or projects. With an intuitive tree layout, users can easily navigate through main categories and drill down into specific subcategories to understand budget allocation details. This organized visual representation is designed to enhance budget management, streamline financial tracking, and support better decision-making within organizations.
    """,
    'description': """
        K8 Hierachy
        Hierachy
        Multi Lever
    """,
    'category': 'K8 Hierachy',
    'version': '18.1',
    'license': 'LGPL-3',
    'author': 'K8 Team',
    'website': 'https://on.net.vn',
    'depends': ['base', 'mail', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/hierachy_settings_views.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'hmv_analytic_hierachy/static/src/**/*'
        ]
    },
    'license': 'LGPL-3',
    # 'price': 170,
    # 'currency': 'EUR',
    'images': [
        'static/description/main.jpg'
    ],
}