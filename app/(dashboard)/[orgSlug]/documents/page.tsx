"use client";

import { useState, useEffect, useMemo } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search } from "lucide-react";
import { toast } from "sonner";
import { DocumentUploadDialog } from "@/components/document/document-upload-dialog";
import { AnalysisType, Document } from "@/types";
import { analysisTypes, formatFileSize } from "@/app/data/data";
import { DocumentCard } from "@/components/document/document-card";

function SkeletonCard() {
  return (
    <div className="border rounded-lg p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-1/3 bg-muted rounded" />
          <div className="flex gap-4">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
          <div className="h-24 w-full bg-muted rounded mt-4" />
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const { organization } = useOrganization();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [expandedSummaries, setExpandedSummaries] = useState<Set<string>>(
    new Set(),
  );
  const [analysisTypeMap, setAnalysisTypeMap] = useState<
    Record<string, AnalysisType>
  >({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "analyzed" | "pending"
  >("all");

  const getAnalysisType = (docId: string): AnalysisType =>
    analysisTypeMap[docId] || "summary";

  const setAnalysisType = (docId: string, type: AnalysisType) => {
    setAnalysisTypeMap((prev) => ({ ...prev, [docId]: type }));
  };

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "analyzed" && doc.aiSummary) ||
        (filterStatus === "pending" && !doc.aiSummary);
      return matchesSearch && matchesFilter;
    });
  }, [documents, searchQuery, filterStatus]);

  // Fetch documents
  const fetchDocuments = async () => {
    if (!organization) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/documents?organizationId=${organization.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDocuments();
  }, [organization]);

  // Toggle summary expansion
  const toggleSummary = (documentId: string) => {
    const newExpanded = new Set(expandedSummaries);
    if (newExpanded.has(documentId)) {
      newExpanded.delete(documentId);
    } else {
      newExpanded.add(documentId);
    }
    setExpandedSummaries(newExpanded);
  };

  // Handle analysis
  const handleAnalyze = async (documentId: string) => {
    if (!organization) return;

    setIsAnalyzing(documentId);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          organizationId: organization.id,
          analysisType: getAnalysisType(documentId),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const analysisTypeLabel = analysisTypes.find(
          (type) => type.value === getAnalysisType(documentId),
        )?.label;

        toast.success(
          `${analysisTypeLabel || "Document"} analysis completed successfully!`,
        );
        fetchDocuments(); // Refresh to show analysis

        // Expand the summary for the newly analyzed document
        setExpandedSummaries((prev) => new Set(prev).add(documentId));
      } else {
        const error = await response.json();
        toast.error(error.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed");
    } finally {
      setIsAnalyzing(null);
    }
  };

  // Handle delete
  const handleDelete = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Document deleted successfully");
        fetchDocuments(); // Refresh list
      } else {
        toast.error("Failed to delete document");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Upload and analyze documents in {organization?.name}
          </p>
        </div>
        <DocumentUploadDialog onUploadSuccess={fetchDocuments} />
      </div>

      {/* Stats Bar */}
      {documents.length > 0 && !isLoading && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{documents.length}</div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {documents.filter((d) => d.aiSummary).length}
                </div>
                <p className="text-sm text-muted-foreground">Analyzed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {formatFileSize(
                    documents.reduce(
                      (acc, doc) => acc + (doc.fileSize || 0),
                      0,
                    ),
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search & Filter Bar */}
      {documents.length > 0 && !isLoading && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(v) =>
              setFilterStatus(v as "all" | "analyzed" | "pending")
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="analyzed">Analyzed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Documents{" "}
            {!isLoading && `(${filteredDocuments.length})`}
          </CardTitle>
          {!isLoading && documents.length > 0 && (
            <CardDescription>
              {documents.filter((d) => d.aiSummary).length} analyzed &bull;{" "}
              {documents.filter((d) => !d.aiSummary).length} pending
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredDocuments.length === 0 && documents.length > 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No documents match your search
              </p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No documents uploaded yet</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Upload your first document to get started
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  isAnalyzing={isAnalyzing === doc.id}
                  selectedAnalysisType={getAnalysisType(doc.id)}
                  onAnalysisTypeChange={(type) =>
                    setAnalysisType(doc.id, type)
                  }
                  onAnalyze={handleAnalyze}
                  onDelete={handleDelete}
                  onToggleSummary={toggleSummary}
                  expandedSummaries={expandedSummaries}
                  formatFileSize={formatFileSize}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
