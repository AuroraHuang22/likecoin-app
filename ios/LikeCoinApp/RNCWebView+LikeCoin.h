//
//  RNCWebView+LikeCoin.h
//  LikeCoinApp
//
//  Created by Ng Wing Tat, David on 11/9/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNCWebView.h"

@interface RNCWebView (LikeCoin)

- (void)                webView:(WKWebView *)webView
decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction
                decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler;

@end
