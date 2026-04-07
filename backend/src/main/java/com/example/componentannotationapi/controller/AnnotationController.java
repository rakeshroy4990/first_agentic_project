package com.example.componentannotationapi.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/components")
public class AnnotationController {

    @GetMapping("/sample")
    public Map<String, Object> sampleComponentAnnotation() {
        return Map.of(
            "schemaVersion", "1.0.0",
            "id", "user-email-input",
            "componentType", "text-input",
            "framework", Map.of(
                "name", "vue",
                "componentRef", "EmailInput.vue"
            ),
            "bindings", new Object[] {
                Map.of(
                    "target", "value",
                    "kind", "twoWay",
                    "from", Map.of("source", "state", "path", "form.email"),
                    "to", Map.of("source", "state", "path", "form.email")
                ),
                Map.of(
                    "target", "visible",
                    "kind", "computed",
                    "from", Map.of("source", "store", "path", "featureFlags.emailCapture")
                )
            },
            "validation", new Object[] {
                Map.of("field", "value", "type", "required", "message", "Email is required"),
                Map.of("field", "value", "type", "email", "message", "Must be a valid email")
            },
            "rbac", Map.of(
                "visibility", Map.of(
                    "mode", "allowAny",
                    "roles", new String[] { "admin", "support" }
                ),
                "enabled", Map.of(
                    "mode", "denyAny",
                    "permissions", new String[] { "user.email.readonly" }
                )
            ),
            "api", new Object[] {
                Map.of(
                    "id", "users.updateEmail",
                    "method", "PATCH",
                    "path", "/api/users/{id}/email",
                    "service", "user-service"
                )
            },
            "events", new Object[] {
                Map.of(
                    "event", "onBlur",
                    "handler", Map.of(
                        "type", "apiCall",
                        "ref", "users.updateEmail"
                    )
                )
            }
        );
    }

    @GetMapping("/uiMetadata/{uniqueId}")
    public Map<String, Object> uiMetadata(@PathVariable("uniqueId") String uniqueId) {
        return Map.of(
            "uniqueId", uniqueId,
            "data", Map.of(
                "header", Map.of(
                    "brand", Map.of(
                        "text", "Crunchyroll",
                        "logoUrl", "",
                        "target", "/"
                    ),
                    "actions", new Object[] {
                        Map.of("id", "search", "label", "Search", "icon", "search", "target", "/search"),
                        Map.of("id", "profile", "label", "Profile", "icon", "user", "target", "/profile")
                    },
                    "theme", Map.of(
                        "backgroundColor", "#111418",
                        "textColor", "#f4f4f4",
                        "accentColor", "#f47521",
                        "mutedTextColor", "#b4b4b4"
                    )
                ),
                "menu", new Object[] {
                    Map.of("id", "new", "label", "New", "target", "/new"),
                    Map.of("id", "popular", "label", "Popular", "target", "/popular"),
                    Map.of("id", "simulcast", "label", "Simulcast", "target", "/simulcast"),
                    Map.of("id", "categories", "label", "Categories", "target", "/categories"),
                    Map.of("id", "games", "label", "Games", "target", "/games"),
                    Map.of("id", "news", "label", "News", "target", "/news")
                },
                "body", Map.of(
                    "title", "Home Page",
                    "description", "Server-driven UI metadata body content"
                ),
                "footer", Map.of(
                    "text", "Copyright 2026 Crunchyroll Demo"
                )
            )
        );
    }
}
